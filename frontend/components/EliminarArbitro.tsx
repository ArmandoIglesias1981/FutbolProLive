"use client";

import { useRouter } from "next/navigation";
import { eliminarArbitro } from "@/services/api";

interface Props {
  id: number;
}

export default function EliminarArbitro({
  id,
}: Props) {
  const router = useRouter();
  async function eliminar() {
    if (!confirm("¿Desea eliminar este árbitro?")) {
      return;
    }
    try {
      await eliminarArbitro(id);
      alert("Árbitro eliminado correctamente.");
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Error al eliminar.");
    }
  }
  return (
    <button
      onClick={eliminar}
      className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-md transition"
    >
      🗑 Eliminar
    </button>
  );
}