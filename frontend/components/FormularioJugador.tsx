"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { calcularEdad } from "@/utils/calcularEdad";
import { subirImagen } from "@/services/upload";
import {obtenerTodosEquipos, crearJugador, actualizarJugador} from "@/services/api";


interface JugadorData {
  id_jugador?: number;
  foto?: string;
  nombres?: string;
  apellidos?: string;
  documento?: string;
  fecha_nacimiento?: string;
  posicion?: string;
  dorsal?: number;
  nacionalidad?: string;
  id_equipo?: number;
  activo?: boolean;
}

interface Props {
  initialData?: JugadorData;
}


export default function FormularioJugador({
    initialData,
  }: Props) {
    const router = useRouter();

    const [formulario, setFormulario] = useState({
    foto: initialData?.foto ?? "",
    nombres: initialData?.nombres ?? "",
    apellidos: initialData?.apellidos ?? "",
    documento: initialData?.documento ?? "",
    fecha_nacimiento:
      initialData?.fecha_nacimiento?.substring(0, 10) ?? "",
    posicion: initialData?.posicion ?? "",
    dorsal: initialData?.dorsal?.toString() ?? "",
    nacionalidad: initialData?.nacionalidad ?? "",
    id_equipo: initialData?.id_equipo?.toString() ?? "",
    activo: initialData?.activo ?? true,
  });

  const [edad, setEdad] = useState("");
  const [subiendo, setSubiendo] = useState(false);
  const [preview, setPreview] = useState(
  initialData?.foto ?? "");
  
  const [equipos, setEquipos] = useState<
    { id_equipo: number; nombre: string }[]
  >([]);

  useEffect(() => {
    async function cargarEquipos() {
      try {
        const datos = await obtenerTodosEquipos();
        setEquipos(datos);
      } catch (error) {
        console.error(error);
      }
    }

    cargarEquipos();
  }, []);

  


  useEffect(() => {
    if (formulario.fecha_nacimiento) {
      setEdad(
        calcularEdad(
          formulario.fecha_nacimiento
        )
      );
    }
  }, [formulario.fecha_nacimiento]);



  function cambiarValor(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value, type } = e.target;
    const nuevoValor =
      type === "checkbox"
        ? (e.target as HTMLInputElement).checked
        : typeof value === "string"
          ? value.toUpperCase()
          : value;
    setFormulario((prev) => ({
      ...prev,
      [name]: nuevoValor,
    }));
    if (name === "fecha_nacimiento") {
      setEdad(calcularEdad(value));
    }
  }




  async function subirFoto(
    e: React.ChangeEvent<HTMLInputElement>
   ) {
    const archivo = e.target.files?.[0];
    if (!archivo) return;
    try {
      setSubiendo(true);
      const url = await subirImagen(archivo);
      setFormulario((prev) => ({
        ...prev,
        foto: url,
      }));
      setPreview(url);
    } catch (error) {
      console.error(error);
      alert("Error al subir la foto.");
    } finally {
      setSubiendo(false);
    }
  }




  async function guardar(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();
    try {
      const datos = {
        ...formulario,
        fecha_nacimiento: formulario.fecha_nacimiento,
        dorsal: Number(formulario.dorsal),
        id_equipo: Number(formulario.id_equipo),
      };
      console.log("Datos enviados:", datos);
      if (initialData?.id_jugador) {
        await actualizarJugador(
          initialData.id_jugador,
          datos
        );
        alert("Jugador actualizado correctamente.");
      } else {
        await crearJugador(datos);
        alert("Jugador creado correctamente.");
      }
      router.push("/jugadores");
      router.refresh();
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("Error al guardar el jugador.");
      }
    }
  }


  return (

    <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-8">
      <h1 className="text-3xl font-bold mb-8">
        {initialData ? "Editar Jugador" : "Nuevo Jugador"}
      </h1>

      <form
        onSubmit={guardar}
        className="space-y-6"
      >
        {/* Aquí iremos agregando cada bloque */}

    
        <div>

          <label className="block font-semibold mb-2">
            Foto del jugador
          </label>

          <input
            type="file"
            accept="image/png,image/jpeg,image/jpg,image/webp"
            onChange={subirFoto}
            className="w-full border rounded-lg p-2"
          />

          {subiendo && (

            <p className="mt-2 text-blue-600">
              Subiendo foto...
            </p>

          )}

          {preview && (

            <div className="mt-4 flex justify-center">

              <img
                src={preview}
                alt="Foto del jugador"
                className="w-40 h-40 rounded-xl object-cover border shadow"
              />

            </div>

          )}

        </div>


         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div>

            <label className="block font-semibold mb-2">
              Fecha de nacimiento
            </label>

            <input
              type="date"
              name="fecha_nacimiento"
              value={formulario.fecha_nacimiento}
              onChange={cambiarValor}
              className="w-full border rounded-lg p-2"
              required
            />

          </div>

          <div>

            <label className="block font-semibold mb-2">
              Edad
            </label>

            <input
              value={edad}
              readOnly
              className="w-full border rounded-lg p-2 bg-gray-100"
            />

          </div>

        </div>

     
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <label className="block font-semibold mb-2">
                Nombres
                </label>
                <input
                name="nombres"
                value={formulario.nombres}
                onChange={cambiarValor}
                className="w-full border rounded-lg p-2 uppercase"
                required
                />
            </div>

            <div>
                <label className="block font-semibold mb-2">
                Apellidos
                </label>
                <input
                name="apellidos"
                value={formulario.apellidos}
                onChange={cambiarValor}
                className="w-full border rounded-lg p-2 uppercase"
                required
                />

            </div>
            </div>
            <div>
            <label className="block font-semibold mb-2">
                Documento
            </label>
            <input
                name="documento"
                value={formulario.documento}
                onChange={cambiarValor}
                className="w-full border rounded-lg p-2 uppercase"
                required
            />
        </div>


        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div>

            <label className="block font-semibold mb-2">
              Equipo
            </label>

            <select
              name="id_equipo"
              value={formulario.id_equipo}
              onChange={cambiarValor}
              className="w-full border rounded-lg p-2"
              required
            >

              <option value="">
                Seleccione un equipo
              </option>

              {equipos.map((equipo) => (

                <option
                  key={equipo.id_equipo}
                  value={equipo.id_equipo}
                >
                  {equipo.nombre}
                </option>

              ))}

            </select>

          </div>

          <div>

            <label className="block font-semibold mb-2">
              Posición
            </label>

            <select
              name="posicion"
              value={formulario.posicion}
              onChange={cambiarValor}
              className="w-full border rounded-lg p-2 uppercase"
              required
            >

              <option value="">
                Seleccione una posición
              </option>

              <option value="PORTERO">Portero</option>

              <option value="DEFENSA">Defensa</option>

              <option value="MEDIOCAMPISTA">
                Mediocampista
              </option>

              <option value="DELANTERO">
                Delantero
              </option>

            </select>

          </div>

        </div>


        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div>

            <label className="block font-semibold mb-2">
              Dorsal
            </label>

            <input
              type="number"
              min={1}
              max={99}
              name="dorsal"
              value={formulario.dorsal}
              onChange={cambiarValor}
              className="w-full border rounded-lg p-2"
              required
            />

          </div>

          <div>

            <label className="block font-semibold mb-2">
              Nacionalidad
            </label>

            <input
              name="nacionalidad"
              value={formulario.nacionalidad}
              onChange={cambiarValor}
              className="w-full border rounded-lg p-2 uppercase"
              required
            />

          </div>

        </div>    


        <div className="flex items-center gap-3">

          <input
            type="checkbox"
            name="activo"
            checked={formulario.activo}
            onChange={cambiarValor}
          />

          <label>
            Jugador Activo
          </label>

        </div>


        <div className="flex gap-4 pt-6">
          <button
            type="submit"
            disabled={subiendo}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-2 rounded-lg"
          >
            {subiendo ? "Subiendo foto..." : "💾 Guardar"}
          </button>


          <Link
            href="/jugadores"
            className="bg-gray-300 hover:bg-gray-400 px-6 py-2 rounded-lg"
          >
            Cancelar
          </Link>
        </div>
      </form>
    </div>

    
  );

}