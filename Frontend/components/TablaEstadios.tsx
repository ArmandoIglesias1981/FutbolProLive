"use client";

import EncabezadoOrdenable from "@/components/tabla/EncabezadoOrdenable";
import TablaBase from "@/components/tabla/TablaBase";
import AccionesTabla from "@/components/acciones/AccionesTabla";
import EliminarEstadio from "./EliminarEstadio";

type Estadio = {
  id_estadio: number;
  foto?: string | null;
  nombre: string;
  ciudad?: string | null;
  direccion?: string | null;
  capacidad?: number | null;
  superficie?: string | null;
  fecha_inauguracion?: string | null;
  activo: boolean;
};

interface Props {

  estadios: Estadio[];

}

export default function TablaEstadios({
  estadios,
}: Props) {

  const columnas = [

    {
      id: "foto",
      encabezado: "Foto",
      render: (estadio: Estadio) =>

        estadio.foto ? (

          <img
            src={estadio.foto}
            className="w-16 h-16 rounded object-cover border"
          />

        ) : (

          <span className="text-gray-400">
            Sin foto
          </span>

        ),
    },

    {
      id: "nombre",
      encabezado: (
        <EncabezadoOrdenable
          campo="nombre"
          titulo="Nombre"
        />
      ),
      render: (estadio: Estadio) =>
        estadio.nombre,
    },

    {
      id: "ciudad",
      encabezado: (
        <EncabezadoOrdenable
          campo="ciudad"
          titulo="Ciudad"
        />
      ),
      render: (estadio: Estadio) =>
        estadio.ciudad,
    },

    {
      id: "direccion",
      encabezado: "Dirección",
      render: (estadio: Estadio) =>
        estadio.direccion,
    },

    {
      id: "superficie",
      encabezado: (
        <EncabezadoOrdenable
          campo="superficie"
          titulo="Superficie"
        />
      ),
      render: (estadio: Estadio) =>
        estadio.superficie,
    },

    {
      id: "capacidad",
      encabezado: (
        <EncabezadoOrdenable
          campo="capacidad"
          titulo="Capacidad"
        />
      ),
      render: (estadio: Estadio) =>
        estadio.capacidad,
    },

    {
      id: "estado",
      encabezado: "Estado",
      render: (estadio: Estadio) => (

        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            estadio.activo
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >

          {estadio.activo
            ? "🟢 Activo"
            : "🔴 Inactivo"}

        </span>

      ),
    },

    {
      id: "acciones",
      encabezado: "Acciones",
      render: (estadio: Estadio) => (

        <AccionesTabla
          editar={`/estadios/editar/${estadio.id_estadio}`}
          eliminar={
            <EliminarEstadio
              id={estadio.id_estadio}
            />
          }
        />

      ),
    },

  ];

  return (

    <TablaBase
      columnas={columnas}
      datos={estadios}
    />

  );

}