"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import {
  API_BASE_URL,
  obtenerUltimaInteraccion,
} from "../../lib/cta/tracking";
import {
  VERSION_POLITICA,
  type Campo,
  type DefinicionFormulario,
} from "../../lib/formularios/tipos";
import { contactHref } from "../../site-config";

type Valores = Record<string, string>;

/** Campos que viajan como identidad del solicitante, no como respuestas. */
const CAMPOS_PERSONA = ["nombreCompleto", "email", "telefono", "pais"];
const CAMPOS_ORGANIZACION = [
  "razonSocial",
  "tipoOrganizacion",
  "registro",
  "sitioWeb",
];

export function FormularioMaestro({
  definicion,
}: {
  definicion: DefinicionFormulario;
}) {
  const parametros = useSearchParams();

  const valoresIniciales = useMemo(() => {
    const iniciales: Valores = {};
    for (const paso of definicion.pasos) {
      for (const campo of paso.campos) {
        if (campo.desdeParametro) {
          const valor = parametros.get(campo.desdeParametro);
          const admitido = campo.opciones?.some(
            (opcion) => opcion.valor === valor,
          );
          if (valor && (admitido || !campo.opciones)) iniciales[campo.nombre] = valor;
        }
      }
    }
    return iniciales;
  }, [definicion, parametros]);

  const [valores, setValores] = useState<Valores>(valoresIniciales);
  const [aceptados, setAceptados] = useState<Record<string, boolean>>({});
  const [paso, setPaso] = useState(0);
  const [errores, setErrores] = useState<Record<string, string>>({});
  const [enviando, setEnviando] = useState(false);
  const [fallo, setFallo] = useState<string | null>(null);
  const [codigo, setCodigo] = useState<string | null>(null);

  const totalPasos = definicion.pasos.length + 1; // +1: consentimientos
  const esPasoConsentimientos = paso === definicion.pasos.length;

  const visible = (campo: Campo) =>
    !campo.dependeDe ||
    campo.dependeDe.valores.includes(valores[campo.dependeDe.campo] ?? "");

  function validarPaso(): boolean {
    if (esPasoConsentimientos) {
      const faltantes = definicion.consentimientos
        .filter((c) => c.obligatorio && !aceptados[c.tipo])
        .map((c) => c.tipo);
      setErrores(
        Object.fromEntries(
          faltantes.map((t) => [t, "Este consentimiento es obligatorio"]),
        ),
      );
      return faltantes.length === 0;
    }

    const nuevos: Record<string, string> = {};
    for (const campo of definicion.pasos[paso].campos) {
      if (!visible(campo)) continue;
      const valor = (valores[campo.nombre] ?? "").trim();
      if (campo.requerido && !valor) {
        nuevos[campo.nombre] = "Este dato es obligatorio";
      } else if (campo.tipo === "email" && valor && !/^\S+@\S+\.\S+$/.test(valor)) {
        nuevos[campo.nombre] = "Revisa el formato del correo";
      }
    }
    setErrores(nuevos);
    return Object.keys(nuevos).length === 0;
  }

  function avanzar() {
    if (!validarPaso()) return;
    setPaso((actual) => Math.min(actual + 1, totalPasos - 1));
  }

  async function enviar() {
    if (!validarPaso()) return;
    setEnviando(true);
    setFallo(null);

    const formData: Record<string, string> = {};
    for (const [clave, valor] of Object.entries(valores)) {
      if (
        !CAMPOS_PERSONA.includes(clave) &&
        !CAMPOS_ORGANIZACION.includes(clave) &&
        valor
      ) {
        formData[clave] = valor;
      }
    }

    const cuerpo = {
      requestType: definicion.requestType,
      interactionId: obtenerUltimaInteraccion() ?? undefined,
      category: definicion.campoCategoria
        ? valores[definicion.campoCategoria]
        : undefined,
      source: parametros.get("source") ?? undefined,
      applicant: valores.nombreCompleto
        ? {
            fullName: valores.nombreCompleto,
            email: valores.email || undefined,
            phone: valores.telefono || undefined,
            country: valores.pais || undefined,
          }
        : undefined,
      organization: valores.razonSocial
        ? {
            legalName: valores.razonSocial,
            organizationType: valores.tipoOrganizacion || undefined,
            registrationNumber: valores.registro || undefined,
            website: valores.sitioWeb || undefined,
          }
        : undefined,
      formData,
      consents: definicion.consentimientos.map((consentimiento) => ({
        consentType: consentimiento.tipo,
        policyVersion: VERSION_POLITICA,
        accepted: Boolean(aceptados[consentimiento.tipo]),
      })),
    };

    try {
      const respuesta = await fetch(`${API_BASE_URL}/api/v1/requests`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cuerpo),
      });

      if (!respuesta.ok) throw new Error(`HTTP ${respuesta.status}`);

      const datos = (await respuesta.json()) as { trackingCode: string };
      setCodigo(datos.trackingCode);
    } catch {
      setFallo(
        "No pudimos registrar la solicitud en este momento. Vuelve a intentarlo o escríbenos al correo institucional.",
      );
    } finally {
      setEnviando(false);
    }
  }

  if (codigo) {
    return (
      <section className="rounded-xl border-t-4 border-verde-hoja bg-white p-8 shadow-sm">
        <h2 className="mb-3 font-montserrat text-2xl font-bold text-verde-bosque">
          Solicitud recibida
        </h2>
        <p className="mb-6 text-gray-700">
          Guarda este código: con él puedes consultar el estado de tu solicitud
          en cualquier momento.
        </p>
        <p className="mb-6 rounded-lg border border-verde-hoja/40 bg-verde-hoja/10 px-6 py-4 text-center font-montserrat text-2xl font-bold tracking-wide text-verde-bosque">
          {codigo}
        </p>
        <p className="mb-6 text-sm text-gray-600">
          Revisaremos la información y te responderemos por el medio de contacto
          que indicaste. El resultado se comunica siempre.
        </p>
        <Link
          href={`/seguimiento/${codigo}`}
          className="inline-flex items-center justify-center rounded-lg bg-verde-hoja px-6 py-3 text-sm font-semibold text-white transition hover:bg-verde-bosque"
        >
          Ver el estado de mi solicitud
        </Link>
      </section>
    );
  }

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
      <div className="mb-6">
        <div className="mb-2 flex items-center justify-between text-sm text-gray-600">
          <span className="font-semibold text-azul-confianza">
            {esPasoConsentimientos
              ? "Consentimientos"
              : definicion.pasos[paso].titulo}
          </span>
          <span>
            Paso {paso + 1} de {totalPasos}
          </span>
        </div>
        <div
          className="h-1.5 w-full overflow-hidden rounded-full bg-gris-niebla"
          role="progressbar"
          aria-valuenow={paso + 1}
          aria-valuemin={1}
          aria-valuemax={totalPasos}
        >
          <div
            className="h-full bg-verde-hoja transition-all"
            style={{ width: `${((paso + 1) / totalPasos) * 100}%` }}
          />
        </div>
      </div>

      {esPasoConsentimientos ? (
        <div className="space-y-4">
          <p className="rounded-lg border border-gray-200 bg-gris-niebla/60 p-4 text-sm leading-relaxed text-gray-700">
            {definicion.avisoPrivacidad}
          </p>
          {definicion.consentimientos.map((consentimiento) => (
            <label
              key={consentimiento.tipo}
              className="flex cursor-pointer gap-3 rounded-lg border border-gray-200 p-4 text-sm text-gray-700 hover:border-verde-hoja"
            >
              <input
                type="checkbox"
                checked={Boolean(aceptados[consentimiento.tipo])}
                onChange={(evento) =>
                  setAceptados((previos) => ({
                    ...previos,
                    [consentimiento.tipo]: evento.target.checked,
                  }))
                }
                className="mt-0.5 h-4 w-4 shrink-0 accent-[#458823]"
              />
              <span>
                {consentimiento.etiqueta}
                {consentimiento.obligatorio && (
                  <span className="ml-1 text-verde-hoja">*</span>
                )}
                {errores[consentimiento.tipo] && (
                  <span className="mt-1 block text-xs font-semibold text-red-600">
                    {errores[consentimiento.tipo]}
                  </span>
                )}
              </span>
            </label>
          ))}
        </div>
      ) : (
        <div className="space-y-5">
          {definicion.pasos[paso].descripcion && (
            <p className="text-sm text-gray-600">
              {definicion.pasos[paso].descripcion}
            </p>
          )}
          {definicion.pasos[paso].campos.filter(visible).map((campo) => (
            <CampoFormulario
              key={campo.nombre}
              campo={campo}
              valor={valores[campo.nombre] ?? ""}
              error={errores[campo.nombre]}
              alCambiar={(valor) =>
                setValores((previos) => ({ ...previos, [campo.nombre]: valor }))
              }
            />
          ))}
        </div>
      )}

      {fallo && (
        <p className="mt-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {fallo}{" "}
          <a
            href={contactHref(`${definicion.titulo} (envío por correo)`)}
            className="font-semibold underline"
          >
            Escribir al correo institucional
          </a>
        </p>
      )}

      <div className="mt-8 flex flex-col gap-3 border-t border-gray-100 pt-6 sm:flex-row sm:justify-between">
        <button
          type="button"
          onClick={() => setPaso((actual) => Math.max(actual - 1, 0))}
          disabled={paso === 0}
          className="rounded-lg border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:invisible"
        >
          Atrás
        </button>

        {esPasoConsentimientos ? (
          <button
            type="button"
            onClick={enviar}
            disabled={enviando}
            className="rounded-lg bg-verde-hoja px-8 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-verde-bosque disabled:opacity-60"
          >
            {enviando ? "Enviando…" : "Enviar solicitud"}
          </button>
        ) : (
          <button
            type="button"
            onClick={avanzar}
            className="rounded-lg bg-verde-hoja px-8 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-verde-bosque"
          >
            Continuar
          </button>
        )}
      </div>
    </section>
  );
}

function CampoFormulario({
  campo,
  valor,
  error,
  alCambiar,
}: {
  campo: Campo;
  valor: string;
  error?: string;
  alCambiar: (valor: string) => void;
}) {
  const id = `campo-${campo.nombre}`;
  const clases = `w-full rounded-lg border px-4 py-3 text-sm text-gray-800 outline-none transition focus:border-verde-hoja focus:ring-2 focus:ring-verde-hoja/30 ${
    error ? "border-red-400" : "border-gray-300"
  }`;

  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block text-sm font-semibold text-azul-confianza"
      >
        {campo.etiqueta}
        {campo.requerido && <span className="ml-1 text-verde-hoja">*</span>}
      </label>

      {campo.tipo === "textarea" ? (
        <textarea
          id={id}
          rows={4}
          value={valor}
          onChange={(evento) => alCambiar(evento.target.value)}
          className={clases}
        />
      ) : campo.tipo === "select" ? (
        <select
          id={id}
          value={valor}
          onChange={(evento) => alCambiar(evento.target.value)}
          className={clases}
        >
          <option value="">Selecciona una opción</option>
          {campo.opciones?.map((opcion) => (
            <option key={opcion.valor} value={opcion.valor}>
              {opcion.etiqueta}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={id}
          type={
            campo.tipo === "email"
              ? "email"
              : campo.tipo === "telefono"
                ? "tel"
                : campo.tipo === "numero"
                  ? "number"
                  : campo.tipo === "fecha"
                    ? "date"
                    : "text"
          }
          value={valor}
          placeholder={campo.marcador}
          onChange={(evento) => alCambiar(evento.target.value)}
          className={clases}
        />
      )}

      {campo.ayuda && !error && (
        <p className="mt-1 text-xs text-gray-500">{campo.ayuda}</p>
      )}
      {error && (
        <p className="mt-1 text-xs font-semibold text-red-600">{error}</p>
      )}
    </div>
  );
}
