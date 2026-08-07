"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function SelectorCantidad() {

  const router = useRouter();
  const params = useSearchParams();

  function cambiarCantidad(
    e: React.ChangeEvent<HTMLSelectElement>
  ) {

    const search = new URLSearchParams(params);

    search.set("limit", e.target.value);

    search.set("page", "1");

    router.push(`/equipos?${search.toString()}`);

  }

  return (

    <select
      defaultValue={params.get("limit") ?? "10"}
      onChange={cambiarCantidad}
      className="border rounded-lg px-3 py-2"
    >

      <option value="10">10 registros</option>

      <option value="25">25 registros</option>

      <option value="50">50 registros</option>

      <option value="100">100 registros</option>

    </select>

  );

}