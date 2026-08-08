"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function SelectorRegistros() {
  const router = useRouter();
  const searchParams = useSearchParams();

  function cambiarCantidad(
    e: React.ChangeEvent<HTMLSelectElement>
  ) {
    const params = new URLSearchParams(
      searchParams.toString()
    );

    params.set("limit", e.target.value);
    params.set("page", "1");

    router.push(`?${params.toString()}`);
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-600">
        Mostrar
      </span>

      <select
        value={searchParams.get("limit") ?? "10"}
        onChange={cambiarCantidad}
        className="border rounded-lg px-2 py-1"
      >
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>

      <span className="text-sm text-gray-600">
        registros
      </span>
    </div>
  );
}