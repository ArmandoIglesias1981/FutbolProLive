"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import {
  crearEstadio,
  actualizarEstadio,
} from "@/services/api";

interface Estadio {
  id_estadio?: number;
  nombre: string;
  ciudad: string;
  direccion: string;
  capacidad: number;
  superficie: string;
  fecha_inauguracion: string;
  foto?: string;
}

interface Props {

  estadio?: Estadio;

}

export default function FormularioEstadios({
  estadio,
}: Props) {

  const router = useRouter();

  
  const [form, setForm] = useState(
    estadio
      ? {
          ...estadio,
          fecha_inauguracion: estadio.fecha_inauguracion
            ? estadio.fecha_inauguracion.substring(0, 10)
            : "",
        }
      : {
          nombre: "",
          ciudad: "",
          direccion: "",
          capacidad: 0,
          superficie: "",
          fecha_inauguracion: "",
          foto: "",
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

  async function subirFoto(
    e: React.ChangeEvent<HTMLInputElement>
  ) {

    if (!e.target.files?.length) return;

    const data = new FormData();

    data.append("file", e.target.files[0]);

    const res = await fetch(
      "http://localhost:3001/upload",
      {
        method: "POST",
        body: data,
      }
    );

    const archivo = await res.json();

    setForm({

      ...form,

      foto: archivo.url,

    });

  }

  async function guardar(
    e: React.FormEvent
  ) {

    e.preventDefault();

    if (form.id_estadio) {

      await actualizarEstadio(
        form.id_estadio,
        form
      );

    } else {

      await crearEstadio(form);

    }

    router.push("/estadios");

    router.refresh();

  }

  return (

    <form
      onSubmit={guardar}
      className="bg-white rounded-xl shadow-lg p-8 max-w-6xl mx-auto"
    >

      {/* FOTO */}
    
      <div className="mb-8">

        <label className="block font-semibold mb-3">

          Foto del estadio

        </label>

        <div className="flex items-center gap-8">

          <input
            type="file"
            accept="image/*"
            onChange={subirFoto}
            className="border rounded-lg p-2"
          />

          <div className="w-40 h-40 rounded-full border-4 border-gray-300 overflow-hidden shadow bg-gray-100 flex items-center justify-center">

            {form.foto ? (

              <img
                src={form.foto}
                alt="Estadio"
                className="w-full h-full object-cover"
              />

            ) : (

              <span className="text-gray-400 text-sm text-center px-3">

                Sin fotografía

              </span>

            )}

          </div>

        </div>

      </div>



      <div className="grid grid-cols-2 gap-6">

        <div>

          <label>Nombre</label>

          <input
            name="nombre"
            value={form.nombre}
            onChange={cambiar}
            className="w-full border rounded-lg p-3 uppercase"
          />

        </div>

        <div>

          <label>Ciudad</label>

          <input
            name="ciudad"
            value={form.ciudad}
            onChange={cambiar}
            className="w-full border rounded-lg p-3 uppercase"
          />

        </div>

        <div>

          <label>Dirección</label>

          <input
            name="direccion"
            value={form.direccion}
            onChange={cambiar}
            className="w-full border rounded-lg p-3 uppercase"
          />

        </div>

        <div>

          <label>Capacidad</label>

          <input
            type="number"
            name="capacidad"
            value={form.capacidad}
            onChange={cambiar}
            className="w-full border rounded-lg p-3 uppercase"
          />

        </div>

        

        <div>

          <label>
            Superficie
          </label>

          <select
            name="superficie"
            value={form.superficie}
            onChange={cambiar}
            className="w-full border rounded-lg p-3 uppercase"
          >

            <option value="">
              SELECCIONE...
            </option>

            <option value="SINTÉTICO">
              GRAMA SINTETICA
            </option>

            <option value="NATURAL">
              GRAMA NATURAL
            </option>

            <option value="ARENA">
              ARENA
            </option>

            <option value="PISO">
              PISO
            </option>

            <option value="GRAMA HÍBRIDA">
              GRAMA HIBRIDA
            </option>

          </select>

        </div>



        <div>

          <label>Fecha inauguración</label>

          <input
            type="date"
            name="fecha_inauguracion"
            value={form.fecha_inauguracion}
            onChange={cambiar}
            className="w-full border rounded-lg p-3"
          />

        </div>

      </div>

      <div className="flex justify-end gap-4 mt-8">

        <button
          type="button"
          onClick={() => router.push("/estadios")}
          className="bg-gray-500 text-white px-6 py-3 rounded-lg"
        >
          Cancelar
        </button>

        <button
          type="submit"
          className="bg-blue-700 text-white px-6 py-3 rounded-lg"
        >
          Guardar Estadio
        </button>

      </div>

    </form>

  );

}