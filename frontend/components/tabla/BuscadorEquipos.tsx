"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function BuscadorEquipos() {

  const router = useRouter();
  const searchParams = useSearchParams();

  const [buscar, setBuscar] = useState(
    searchParams.get("buscar") ?? ""
  );

  
  useEffect(() => {

    const timeout = setTimeout(() => {

      const params = new URLSearchParams(searchParams);

      if (buscar.trim()) {
        params.set("buscar", buscar);
      } else {
        params.delete("buscar");
      }

      router.replace(`/equipos?${params.toString()}`);

    }, 500);

    return () => clearTimeout(timeout);

  }, [buscar, router, searchParams]);

  return (

    <input
      type="text"
      placeholder="Buscar por ID, nombre, ciudad o director técnico..."
      value={buscar}
      onChange={(e) => setBuscar(e.target.value)}
      className="w-full md:w-96 border rounded-lg px-4 py-3 shadow-sm"
    />

  );

}