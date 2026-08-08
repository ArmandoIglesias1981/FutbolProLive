"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import EquipoForm from "@/components/equipos/EquipoForm";
import { actualizarEquipo } from "@/services/api";

import type { Equipo } from "@/components/equipos/EquipoForm";

interface Props {
  equipo: Equipo;
}

export default function EditarEquipoClient({
  equipo,
}: Props) {

  const router = useRouter();

  const [loading, setLoading] = useState(false);

  async function guardar(data: Equipo) {

    try {

      setLoading(true);

      await actualizarEquipo(
        equipo.id_equipo!,
        data
      );

      alert("Equipo actualizado correctamente.");

      router.push("/equipos");

      router.refresh();

    } catch (error: any) {

      console.error(error);

      alert(
        error?.message ??
        "Ocurrió un error al actualizar el equipo."
      );

    } finally {

      setLoading(false);

    }

  }

  return (

    <div className="max-w-3xl mx-auto p-8">

      <h1 className="text-3xl font-bold mb-8">
        Editar Equipo
      </h1>

      <EquipoForm
        initialData={equipo}
        onSubmit={guardar}
        loading={loading}
      />

    </div>

  );

}