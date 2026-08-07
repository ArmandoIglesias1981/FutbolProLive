"use client";

import { useRouter } from "next/navigation";
import { eliminarEstadio } from "@/services/api";

interface Props {
  id: number;
}

export default function EliminarEstadio({
  id,
}: Props) {
  const router = useRouter();
  async function eliminar() {
    if (!confirm("¿Desea eliminar este estadio?")) {
      return;
    }
    try {
     await eliminarEstadio(id);
     alert("Estadio eliminado correctamente.");
     router.refresh();
     } catch (error) {
      console.error(error);
      alert("Error al eliminar.");
    }
  }

  return (
    <button
      onClick={eliminar}
      className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-md"
    >
      🗑 Eliminar
    </button>
  );
}