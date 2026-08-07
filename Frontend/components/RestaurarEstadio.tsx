"use client";

import { useRouter } from "next/navigation";

import {
  restaurarEstadio,
} from "@/services/api";

interface Props {

  id: number;

}

export default function RestaurarEstadio({
  id,
}: Props) {

  const router = useRouter();

  async function restaurar() {

    if (
      !confirm(
        "¿Restaurar este estadio?"
      )
    )
      return;

    await restaurarEstadio(id);

    router.refresh();

  }

  return (

    <button
      onClick={restaurar}
      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
    >

      Restaurar

    </button>

  );

}