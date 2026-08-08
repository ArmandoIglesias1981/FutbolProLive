"use client";

import RestaurarArbitro from "./RestaurarArbitro";
import TablaBase from "@/components/tabla/TablaBase";

type Arbitro = {
  id_arbitro: number;
  foto?: string | null;
  nombres: string;
  apellidos: string;
  documento: string;
  telefono?: string | null;
  correo?: string | null;
  categoria: string;
};

interface Props {

  arbitros: Arbitro[];

}

export default function TablaArbitrosInactivos({

  arbitros,

}: Props) {

  const columnas = [

    {
      id: "foto",
      encabezado: "Foto",
      render: (a: Arbitro) =>
        a.foto ? (
          <img
            src={a.foto}
            alt={a.nombres}
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

      encabezado: "Documento",

      render: (a: Arbitro) => a.documento,

    },

    {

      id: "nombre",

      encabezado: "Nombre",

      render: (a: Arbitro) =>

        `${a.nombres} ${a.apellidos}`,

    },

    {

      id: "correo",

      encabezado: "Correo",

      render: (a: Arbitro) =>

        a.correo ?? "-",

    },

    {

      id: "telefono",

      encabezado: "Teléfono",

      render: (a: Arbitro) =>

        a.telefono ?? "-",

    },

    {

      id: "categoria",

      encabezado: "Categoría",

      render: (a: Arbitro) =>

        a.categoria,

    },

    {

      id: "acciones",

      encabezado: "Acciones",

      render: (a: Arbitro) => (

        <RestaurarArbitro

          id={a.id_arbitro}

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