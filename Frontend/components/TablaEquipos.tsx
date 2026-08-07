"use client";

import EliminarEquipo from "./EliminarEquipo";
import TablaBase from "@/components/tabla/TablaBase";
import EncabezadoOrdenable from "@/components/tabla/EncabezadoOrdenable";
import AccionesTabla from "@/components/acciones/AccionesTabla";

type Equipo = {
  id_equipo: number;
  nombre: string;
  ciudad?: string | null;
  director_tecnico?: string | null;
  id_tecnico?: string | null;
  cel_tecnico?: string | null;
  correo_tecnico?: string | null;
  presidente?: string | null;
  escudo?: string | null;
  fecha_registro?: string | null;
  activo: boolean;
};

interface Props {
  equipos: Equipo[];
}

export default function TablaEquipos({ equipos }: Props) {
  const columnas = [
    {
      id: "escudo",
      encabezado: "Escudo",
      render: (equipo: Equipo) =>
        equipo.escudo ? (
          <img
            src={equipo.escudo}
            alt={equipo.nombre}
            className="w-14 h-14 object-contain rounded-lg border bg-white p-1"
          />
        ) : (
          <span className="text-gray-400 text-sm">
            Sin escudo
          </span>
        ),
    },

    {
      id: "id",
      encabezado: (
        <EncabezadoOrdenable
          campo="id_equipo"
          titulo="ID"
        />
      ),
      render: (equipo: Equipo) => equipo.id_equipo,
    },

    {
      id: "nombre",
      encabezado: (
        <EncabezadoOrdenable
          campo="nombre"
          titulo="Equipo"
        />
      ),
      render: (equipo: Equipo) => (
        <span className="font-semibold">
          {equipo.nombre}
        </span>
      ),
    },

    {
      id: "ciudad",
      encabezado: (
        <EncabezadoOrdenable
          campo="ciudad"
          titulo="Ciudad"
        />
      ),
      render: (equipo: Equipo) =>
        equipo.ciudad ?? "-",
    },

    {
      id: "director",
      encabezado: (
        <EncabezadoOrdenable
          campo="director_tecnico"
          titulo="Director Técnico"
        />
      ),
      render: (equipo: Equipo) =>
        equipo.director_tecnico ?? "-",
    },

    {
      id: "id_tecnico",
      encabezado: "Identificación",
      render: (equipo: Equipo) =>
        equipo.id_tecnico ?? "-",
    },

    {
      id: "celular",
      encabezado: "Celular",
      render: (equipo: Equipo) =>
        equipo.cel_tecnico ?? "-",
    },

    {
      id: "correo",
      encabezado: "Correo",
      render: (equipo: Equipo) =>
        equipo.correo_tecnico ? (
          <span
            className="text-blue-600 truncate max-w-[220px] block"
            title={equipo.correo_tecnico}
          >
            {equipo.correo_tecnico}
          </span>
        ) : (
          "-"
        ),
    },

    {
      id: "presidente",
      encabezado: "Presidente",
      render: (equipo: Equipo) =>
        equipo.presidente ?? "-",
    },

    {
      id: "fecha_registro",
      encabezado: (
        <EncabezadoOrdenable
          campo="fecha_registro"
          titulo="Fecha Registro"
        />
      ),
      render: (equipo: Equipo) => {
        if (!equipo.fecha_registro) return "-";

        return new Date(
          equipo.fecha_registro
        ).toLocaleDateString("es-CO");
      },
    },

    {
      id: "estado",
      encabezado: "Estado",
      render: (equipo: Equipo) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            equipo.activo
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {equipo.activo
            ? "🟢 Activo"
            : "🔴 Inactivo"}
        </span>
      ),
    },

    {
      id: "acciones",
      encabezado: "Acciones",
      render: (equipo: Equipo) => (
        <AccionesTabla
          editar={`/equipos/editar/${equipo.id_equipo}`}
          eliminar={
            <EliminarEquipo
              id={equipo.id_equipo}
            />
          }
        />
      ),
    },
  ];

  return (
    <TablaBase
      columnas={columnas}
      datos={equipos}
    />
  );
}