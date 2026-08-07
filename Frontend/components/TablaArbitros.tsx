"use client";

import EncabezadoOrdenable from "@/components/tabla/EncabezadoOrdenable";
import TablaBase from "@/components/tabla/TablaBase";
import AccionesTabla from "@/components/acciones/AccionesTabla";
import EliminarArbitro from "./EliminarArbitro";

type Arbitro = {
  id_arbitro: number;
  foto?: string | null;
  nombres: string;
  apellidos: string;
  documento: string;
  correo?: string | null;
  telefono?: string | null;
  nacionalidad?: string | null;
  categoria: string;
  experiencia?: number | null;
  activo: boolean;
};

interface Props {
  arbitros: Arbitro[];
}

export default function TablaArbitros({
  arbitros,
}: Props) {

  const columnas = [

    {
      id: "foto",
      encabezado: "Foto",
      render: (arbitro: Arbitro) =>
        arbitro.foto ? (
          <img
            src={arbitro.foto}
            alt={arbitro.nombres}
            className="w-14 h-14 rounded-full object-cover border"
          />
        ) : (
          <span className="text-gray-400">
            Sin foto
          </span>
        ),
    },

    {
      id: "documento",
      encabezado: (
        <EncabezadoOrdenable
          campo="documento"
          titulo="Documento"
        />
      ),
      render: (arbitro: Arbitro) =>
        arbitro.documento,
    },

    {
      id: "nombre",
      encabezado: (
        <EncabezadoOrdenable
          campo="nombres"
          titulo="Nombre"
        />
      ),
      render: (arbitro: Arbitro) => (
        <strong>
          {arbitro.nombres} {arbitro.apellidos}
        </strong>
      ),
    },

    {
      id: "correo",
      encabezado: (
        <EncabezadoOrdenable
          campo="correo"
          titulo="Correo"
        />
      ),
      render: (arbitro: Arbitro) =>
        arbitro.correo ?? "-",
    },

    {
      id: "telefono",
      encabezado: (
        <EncabezadoOrdenable
          campo="telefono"
          titulo="Teléfono"
        />
      ),
      render: (arbitro: Arbitro) =>
        arbitro.telefono ?? "-",
    },

    {
      id: "nacionalidad",
      encabezado: (
        <EncabezadoOrdenable
          campo="nacionalidad"
          titulo="Nacionalidad"
        />
      ),
      render: (arbitro: Arbitro) =>
        arbitro.nacionalidad ?? "-",
    },

    {
      id: "categoria",
      encabezado: (
        <EncabezadoOrdenable
          campo="categoria"
          titulo="Categoría"
        />
      ),
      render: (arbitro: Arbitro) =>
        arbitro.categoria,
    },

    {
      id: "experiencia",
      encabezado: (
        <EncabezadoOrdenable
          campo="experiencia"
          titulo="Experiencia"
        />
      ),
      render: (arbitro: Arbitro) =>
        arbitro.experiencia
          ? `${arbitro.experiencia} años`
          : "-",
    },

    {
      id: "estado",
      encabezado: "Estado",
      render: (arbitro: Arbitro) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            arbitro.activo
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {arbitro.activo
            ? "🟢 Activo"
            : "🔴 Inactivo"}
        </span>
      ),
    },

    {
      id: "acciones",
      encabezado: "Acciones",
      render: (arbitro: Arbitro) => (
        <AccionesTabla
          editar={`/arbitros/editar/${arbitro.id_arbitro}`}
          eliminar={
            <EliminarArbitro
              id={arbitro.id_arbitro}
            />
          }
        />
      ),
    },

  ];

  return (

    <TablaBase
      columnas={columnas}
      datos={arbitros}
    />

  );

}