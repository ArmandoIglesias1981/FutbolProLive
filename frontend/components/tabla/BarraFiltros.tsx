"use client";

import BuscadorEquipos from "@/components/tabla/BuscadorEquipos";
import SelectorCantidad from "@/components/tabla/SelectorCantidad";
import LimpiarFiltros from "@/components/tabla/LimpiarFiltros";

interface Props {
  total: number;
}

export default function BarraFiltros({
  total,
}: Props) {
  return (
   
        <div className="bg-white rounded-xl shadow p-4 mb-6">

            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

            {/* Buscador */}

            <div className="flex-1">

                <BuscadorEquipos />

            </div>

            {/* Panel derecho */}

            <div className="flex items-center gap-6">

                <div className="text-sm text-gray-600">

                Total

                <span className="font-bold ml-2 text-blue-700">

                    {total}

                </span>

                registros

                </div>

                <div className="flex items-center gap-2">

                <span className="text-sm">

                    Mostrar

                </span>

                <SelectorCantidad />

                </div>

                <LimpiarFiltros />

            </div>

            </div>

        </div>

    );
}