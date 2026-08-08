"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function LimpiarFiltros() {

  const router = useRouter();
  const params = useSearchParams();

  function limpiar() {

    const limit = params.get("limit") ?? "10";

    router.push(
      `/equipos?page=1&limit=${limit}&sort=id_equipo&order=asc`
    );

  }

  return (

    <button
      onClick={limpiar}
        className="
        px-4
        py-2
        rounded-lg
        bg-red-50
        text-red-700
        hover:bg-red-100
        border
        border-red-200
        transition
        font-medium
        "
    >
      🧹 Limpiar filtros
    </button>

  );

}