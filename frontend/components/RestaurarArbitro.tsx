"use client";

import { useRouter } from "next/navigation";

import {

  restaurarArbitro,

} from "@/services/api";

interface Props {

  id: number;

}

export default function RestaurarArbitro({

  id,

}: Props) {

  const router = useRouter();

  async function restaurar() {

    const ok = confirm(

      "¿Desea restaurar este árbitro?"

    );

    if (!ok) return;

    await restaurarArbitro(id);

    router.refresh();

  }

  return (

    <button

      onClick={restaurar}

      className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg"

    >

      ♻ Restaurar

    </button>

  );

}