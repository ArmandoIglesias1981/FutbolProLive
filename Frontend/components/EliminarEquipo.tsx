"use client";

import { useRouter } from "next/navigation";
import { eliminarEquipo } from "@/services/api";
import Boton from "./ui/Boton";

interface Props {
  id: number;
}

export default function EliminarEquipo({ id }: Props) {
  const router = useRouter();

  async function eliminar() {
    const confirmar = window.confirm(
      "¿Está seguro de eliminar este equipo?"
    );

    if (!confirmar) return;

    try {
      await eliminarEquipo(id);

      alert("Equipo eliminado correctamente.");

      router.push("/equipos");
      router.refresh();

    } 
    
    catch (error) {
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