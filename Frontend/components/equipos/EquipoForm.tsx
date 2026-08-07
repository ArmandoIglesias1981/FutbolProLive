"use client";

import { subirImagen } from "@/services/upload";
import { useState } from "react";
import { useRouter } from "next/navigation";

export interface Equipo {
  id_equipo?: number;
  nombre: string;
  ciudad: string;
  director_tecnico: string;
  id_tecnico: string;
  cel_tecnico: string;
  correo_tecnico: string;
  presidente: string;
  escudo: string;
  activo: boolean;
  fecha_registro?: string;
}

export interface NuevoEquipo {
  nombre: string;
  ciudad: string;
  director_tecnico: string;
  id_tecnico: string;
  cel_tecnico: string;
  correo_tecnico: string;
  presidente: string;
  escudo: string;
  activo: boolean;
}

interface Props {
  initialData?: Equipo;
  onSubmit: (data: Equipo) => void;
  loading?: boolean;
}

export default function EquipoForm({
  initialData,
  onSubmit,
  loading = false,
}: Props) {
  const [form, setForm] = useState<Equipo>(
    initialData ?? {
      id_equipo: undefined,
      nombre: "",
      ciudad: "",
      director_tecnico: "",
      id_tecnico: "",
      cel_tecnico: "",
      correo_tecnico: "",
      presidente: "",
      escudo: "",
      activo: true,
      fecha_registro: "",
    }
  );

  const [subiendo, setSubiendo] = useState(false);

  const [preview, setPreview] = useState(
    initialData?.escudo || ""
  );

  const router = useRouter();

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const { name, value, type, checked } = e.target;
    const nuevoValor =
      type === "checkbox"
        ? checked
        : value.toUpperCase();
    setForm({
      ...form,
      [name]: nuevoValor,
    });
  }

  async function subirEscudo(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const archivo = e.target.files?.[0];
    if (!archivo) return;
    try {
      setSubiendo(true);
      const url = await subirImagen(archivo);
      setForm((prev) => ({
        ...prev,
        escudo: url,
      }));
      setPreview(url);
    } catch (error) {
      console.error(error);
      alert("Error al subir el escudo.");
    } finally {
      setSubiendo(false);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit({
      ...form,
      nombre: form.nombre.toUpperCase(),
      ciudad: form.ciudad.toUpperCase(),
      director_tecnico: form.director_tecnico.toUpperCase(),
      id_tecnico: form.id_tecnico.toUpperCase(),
      cel_tecnico: form.cel_tecnico,
      correo_tecnico: form.correo_tecnico.toUpperCase(),
      presidente: form.presidente.toUpperCase(),
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl shadow-lg p-6 space-y-5"
    >
      <div>
        <label className="block mb-2 font-semibold">
          ID del Equipo
        </label>

        <input
          value={
            form.id_equipo ??
            "Se genera automáticamente"
          }
          disabled
          className="w-full rounded-lg border bg-gray-100 p-3 text-gray-600"
        />
      </div>

      <div>
        <label className="block mb-2 font-semibold">
          Nombre
        </label>

        <input
          type="text"
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
          className="w-full border rounded-lg p-2 uppercase"
          required
        />
      </div>

      <div>
        <label className="block mb-2 font-semibold">
          Ciudad
        </label>

        <input
          type="text"
          name="ciudad"
          value={form.ciudad}
          onChange={handleChange}
          className="w-full border rounded-lg p-2 uppercase"
        />
      </div>

      <div>
        <label className="block mb-2 font-semibold">
          Director Técnico
        </label>

        <input
          type="text"
          name="director_tecnico"
          value={form.director_tecnico}
          onChange={handleChange}
          className="w-full border rounded-lg p-2 uppercase"
        />
      </div>

      <div>
        <label className="block mb-2 font-semibold">
          Identificación del Técnico
        </label>

        <input
          type="text"
          name="id_tecnico"
          value={form.id_tecnico}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
        />
      </div>

      <div>
        <label className="block mb-2 font-semibold">
          Celular del Técnico
        </label>

        <input
          type="text"
          name="cel_tecnico"
          value={form.cel_tecnico}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
        />
      </div>

      <div>
        <label className="block mb-2 font-semibold">
          Correo del Técnico
        </label>

        <input
          type="email"
          name="correo_tecnico"
          value={form.correo_tecnico}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
        />
      </div>

      <div>
        <label className="block mb-2 font-semibold">
          Presidente
        </label>

        <input
          type="text"
          name="presidente"
          value={form.presidente}
          onChange={handleChange}
          className="w-full border rounded-lg p-2 uppercase"
        />
      </div>

      <div>
        <label className="block mb-2 font-semibold">
          Escudo del Equipo
        </label>

        <input
          type="file"
          accept="image/png,image/jpeg,image/jpg,image/webp"
          onChange={subirEscudo}
          className="w-full border rounded-lg p-3"
        />

        {subiendo && (
          <p className="mt-2 text-blue-600">
            Subiendo escudo...
          </p>
        )}

        {preview && (
          <div className="mt-4 flex justify-center">
            <img
              src={preview}
              alt="Escudo del equipo"
              className="w-36 h-36 object-contain border rounded-xl p-2 bg-gray-50"
            />
          </div>
        )}
      </div>

      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          name="activo"
          checked={form.activo}
          onChange={handleChange}
          className="h-5 w-5"
        />

        <label className="font-semibold">
          Equipo Activo
        </label>
      </div>

      <div>
        <label className="block mb-2 font-semibold">
          Fecha de Registro
        </label>

        <input
          value={
            form.fecha_registro ||
            "Se genera automáticamente"
          }
          disabled
          className="w-full rounded-lg border bg-gray-100 p-3 text-gray-600"
        />
      </div>

      
      <div className="flex gap-3">

        <button
          type="submit"
          disabled={loading || subiendo}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg"
        >
          {loading
            ? "Guardando..."
            : subiendo
            ? "Subiendo escudo..."
            : "💾 Guardar Equipo"}
        </button>

        <button
          type="button"
          onClick={() => router.push("/equipos")}
          className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg"
        >
          ❌ Cancelar
        </button>

      </div>



    </form>
  );
}