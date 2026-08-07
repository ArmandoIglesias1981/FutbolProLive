"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function BarraBusqueda() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [buscar, setBuscar] = useState(
    searchParams.get("buscar") ?? ""
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams(
        searchParams.toString()
      );

      if (buscar) {
        params.set("buscar", buscar);
      } else {
        params.delete("buscar");
      }

      params.set("page", "1");

      router.push(`?${params.toString()}`);
    }, 300);

    return () => clearTimeout(timer);

  }, [buscar]);

  return (
    <input
        type="text"
        placeholder="Buscar..."
        value={buscar}
        onChange={(e) =>
            setBuscar(e.target.value.toUpperCase())
        }
        className="border rounded-lg px-4 py-2 w-80 uppercase"
    />
  );
}