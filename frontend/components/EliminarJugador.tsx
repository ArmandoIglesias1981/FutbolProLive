"use client";

import { useRouter } from "next/navigation";
import { eliminarJugador } from "@/services/api";
import Boton from "./ui/Boton";

interface Props {
  id: number;
}

export default function EliminarJugador({ id }: Props) {
  const router = useRouter();

  async function eliminar() {
    const confirmar = window.confirm(
      "¿Está seguro de eliminar este jugador?"
    );

    if (!confirmar) return;

    try {
      await eliminarJugador(id);

      alert("Jugador eliminado correctamente.");

      router.push("/jugadores");
      router.refresh();

    } catch (error) {

      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("Error inesperado.");
      }

      console.error(error);

    }
  }

  return (
    <Boton
      color="red"
      onClick={eliminar}
    >
      🗑 Eliminar
    </Boton>
  );
}