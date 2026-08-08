"use client";

import { useRouter, useSearchParams } from "next/navigation";

interface Props {
  campo: string;
  titulo: string;
}

export default function EncabezadoOrdenable({
  campo,
  titulo,
}: Props) {

  const router = useRouter();
  const params = useSearchParams();

  const sort = params.get("sort") ?? "id_equipo";
  const order = params.get("order") ?? "asc";

  function ordenar() {

    const search = new URLSearchParams(params);

    let nuevoOrden: "asc" | "desc" = "asc";

    if (sort === campo) {
      nuevoOrden = order === "asc" ? "desc" : "asc";
    }

    search.set("sort", campo);
    search.set("order", nuevoOrden);

    // Cuando cambia el orden volvemos a la primera página
    search.set("page", "1");

    router.push(`/equipos?${search.toString()}`);
  }

  return (
    <button
      onClick={ordenar}
      className="flex items-center gap-1 hover:text-yellow-300 transition font-semibold"
    >
      {titulo} 

      {sort === campo && (
        <span>
          {order === "asc" ? "▲" : "▼"}
        </span>
      )}
    </button>
  );
}