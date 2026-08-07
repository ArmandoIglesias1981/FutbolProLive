"use client";

import TablaBase from "@/components/tabla/TablaBase";
import RestaurarEstadio from "./RestaurarEstadio";

type Estadio = {
  id_estadio: number;
  foto?: string | null;
  nombre: string;
  ciudad?: string | null;
  direccion?: string | null;
  capacidad?: number | null;
  superficie?: string | null;
  fecha_inauguracion?: string | null;
};

interface Props {
  estadios: Estadio[];
}

export default function TablaEstadiosInactivos({
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
            alt={estadio.nombre}
            className="w-14 h-14 rounded-full object-cover border"
          />
        ) : (
          <span className="text-gray-400">
            Sin foto
          </span>
        ),
    },

    {
      id: "nombre",
      encabezado: "Nombre",
      render: (estadio: Estadio) => estadio.nombre,
    },

    {
      id: "ciudad",
      encabezado: "Ciudad",
      render: (estadio: Estadio) =>
        estadio.ciudad ?? "-",
    },

    {
      id: "direccion",
      encabezado: "Dirección",
      render: (estadio: Estadio) =>
        estadio.direccion ?? "-",
    },

    {
      id: "capacidad",
      encabezado: "Capacidad",
      render: (estadio: Estadio) =>
        estadio.capacidad ?? "-",
    },

    {
      id: "superficie",
      encabezado: "Superficie",
      render: (estadio: Estadio) =>
        estadio.superficie ?? "-",
    },

    {
      id: "fecha",
      encabezado: "Inauguración",
      render: (estadio: Estadio) =>
        estadio.fecha_inauguracion
          ? new Date(estadio.fecha_inauguracion)
              .toLocaleDateString("es-CO")
          : "-",
    },

    {
      id: "acciones",
      encabezado: "Acciones",
      render: (estadio: Estadio) => (
        <RestaurarEstadio
          id={estadio.id_estadio}
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