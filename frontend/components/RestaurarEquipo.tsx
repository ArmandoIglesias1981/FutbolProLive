"use client";

import { useRouter } from "next/navigation";
import { restaurarEquipo } from "@/services/api";
import Boton from "./ui/Boton";

interface Props {
  id: number;
}

export default function RestaurarEquipo({ id }: Props) {

  const router = useRouter();

  async function restaurar() {

    const confirmar = window.confirm(
      "¿Desea restaurar este equipo?"
    );

    if (!confirmar) return;

    try {

      await restaurarEquipo(id);

      alert("Equipo restaurado correctamente.");

      router.refresh();

    } catch (error) {

      console.error(error);

      alert("No fue posible restaurar el equipo.");

    }

  }

  return (

    <Boton
      color="green"
      onClick={restaurar}
    >
      🟢 Restaurar
    </Boton>

  );

}