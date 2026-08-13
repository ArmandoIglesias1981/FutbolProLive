"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import {
  crearArbitro,
  actualizarArbitro,
} from "@/services/api";

import { subirImagen } from "@/services/upload";

interface Arbitro {
  id_arbitro?: number;
  foto?: string;
  nombres: string;
  apellidos: string;
  documento: string;
  telefono: string;
  correo: string;
  nacionalidad: string;
  categoria:
    | "MUNICIPAL"
    | "DEPARTAMENTAL"
    | "NACIONAL"
    | "FIFA";
  experiencia: number;
}

interface Props {
  arbitro?: Arbitro;
}

export default function FormularioArbitros({
  arbitro,
}: Props) {

  const router = useRouter();

  const [form, setForm] = useState<Arbitro>(
    arbitro ?? {
      foto: "",
      documento: "",
      nombres: "",
      apellidos: "",
      telefono: "",
      correo: "",
      nacionalidad: "COLOMBIANA",
      categoria: "MUNICIPAL",
      experiencia: 0,
    }
  );

  function cambiar(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) {
    const { name, value, type } = e.target;
    setForm({
      ...form,
      [name]:
        type === "number"
          ? Number(value)
          : value.toUpperCase(),
    });
  }

  async function guardar(
    e: React.FormEvent
  ) {
    e.preventDefault();

    if (form.id_arbitro) {
      await actualizarArbitro(
        form.id_arbitro,
        form
      );
    } else {
      await crearArbitro(form);
    }

    router.push("/arbitros");
    router.refresh();
  }

  function cancelar() {
    router.push("/arbitros");
  }

  async function subirFoto(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const archivo = e.target.files?.[0];

    if (!archivo) return;

    try {
      const url = await subirImagen(archivo);

      setForm((prev) => ({
        ...prev,
        foto: url,
      }));
    } catch (error) {
      console.error("Error al subir foto:", error);
      alert("Error al subir la foto del árbitro.");
    }
  }

  return (

    <form
      onSubmit={guardar}
      className="bg-white rounded-xl shadow-lg p-8 max-w-6xl mx-auto"
    >

      {/* FOTO */}

      <div className="mb-8">

        <label className="block font-semibold mb-3 text-gray-700">
          Foto del árbitro
        </label>

        <div className="flex items-center gap-8">

          <input
            type="file"
            accept="image/*"
            onChange={subirFoto}
            className="border rounded-lg p-2"
          />

          {form.foto && (

            <img
              src={form.foto}
              alt="Foto"
              className="w-32 h-32 rounded-full border object-cover shadow"
            />

          )}

        </div>

      </div>

      {/* CAMPOS */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <div>

          <label className="block mb-2 font-semibold">
            Documento
          </label>

          <input
            name="documento"
            value={form.documento}
            onChange={cambiar}
            className="w-full border rounded-lg p-3 uppercase"
          />

        </div>

        <div>

          <label className="block mb-2 font-semibold">
            Nacionalidad
          </label>

          <input
            name="nacionalidad"
            value={form.nacionalidad}
            onChange={cambiar}
            className="w-full border rounded-lg p-3 uppercase"
          />

        </div>

        <div>

          <label className="block mb-2 font-semibold">
            Nombres
          </label>

          <input
            name="nombres"
            value={form.nombres}
            onChange={cambiar}
            className="w-full border rounded-lg p-3 uppercase"
          />

        </div>

        <div>

          <label className="block mb-2 font-semibold">
            Apellidos
          </label>

          <input
            name="apellidos"
            value={form.apellidos}
            onChange={cambiar}
            className="w-full border rounded-lg p-3 uppercase"
          />

        </div>

        <div>

          <label className="block mb-2 font-semibold">
            Correo electrónico
          </label>

          <input
            type="email"
            name="correo"
            value={form.correo}
            onChange={cambiar}
            className="w-full border rounded-lg p-3 uppercase"
          />

        </div>

        <div>

          <label className="block mb-2 font-semibold">
            Teléfono
          </label>

          <input
            name="telefono"
            value={form.telefono}
            onChange={cambiar}
            className="w-full border rounded-lg p-3 uppercase"
          />

        </div>

        <div>

          <label className="block mb-2 font-semibold">
            Categoría
          </label>

          <select
            name="categoria"
            value={form.categoria}
            onChange={cambiar}
            className="w-full border rounded-lg p-3 uppercase"
          >

            <option value="MUNICIPAL">
              Municipal
            </option>

            <option value="DEPARTAMENTAL">
              Departamental
            </option>

            <option value="NACIONAL">
              Nacional
            </option>

            <option value="FIFA">
              FIFA
            </option>

          </select>

        </div>

        <div>

          <label className="block mb-2 font-semibold">
            Años de experiencia
          </label>

          <input
            type="number"
            name="experiencia"
            value={form.experiencia}
            onChange={cambiar}
            className="w-full border rounded-lg p-3"
          />

        </div>

      </div>

      {/* BOTONES */}

      <div className="flex justify-end gap-4 mt-10">

        <button
          type="button"
          onClick={cancelar}
          className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg"
        >
          Cancelar
        </button>

        <button
          type="submit"
          className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-lg"
        >
          Guardar Árbitro
        </button>

      </div>

    </form>

  );

}