"use client";

import { useRouter } from "next/navigation";
import { restaurarJugador } from "@/services/api";

interface Props {
  id: number;
}

export default function RestaurarJugador({ id }: Props) {
  const router = useRouter();

  const restaurar = async () => {
    try {
      const confirmar = window.confirm(
        "¿Desea restaurar este jugador?"
      );

      if (!confirmar) return;

      await restaurarJugador(id);

      alert("Jugador restaurado correctamente.");

      router.refresh();

    } catch (error) {
      console.error(error);
      alert("Error al restaurar el jugador.");
    }
  };

  return (
    <button
      type="button"
      onClick={restaurar}
      className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg"
    >
      ♻ Restaurar
    </button>
  );
}