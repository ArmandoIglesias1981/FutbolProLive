import { ReactNode } from "react";

interface Props {

  titulo: string;

  descripcion: string;

  acciones?: ReactNode;

  filtros?: ReactNode;

  resumen?: ReactNode;

  exportar?: ReactNode;

  tabla: ReactNode;

  paginacion?: ReactNode;

}

export default function AdminLayout({

  titulo,

  descripcion,

  acciones,

  filtros,

  resumen,

  exportar,

  tabla,

  paginacion,

}: Props) {

  return (

    <div className="p-8 bg-gray-100 min-h-screen">

      <div className="flex justify-between items-center mb-8">

        <div>

          <h1 className="text-4xl font-bold text-gray-800">

            {titulo}

          </h1>

          <p className="text-gray-500 mt-2">

            {descripcion}

          </p>

        </div>

        {acciones}

      </div>

      {filtros}

      {resumen}

      <div className="mb-5 flex justify-end">

        {exportar}

      </div>

      {tabla}

      {paginacion}

    </div>

  );

}