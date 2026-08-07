"use client";

import EquipoForm from "@/components/equipos/EquipoForm";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { crearEquipo } from "@/services/api";
import type { Equipo } from "@/components/equipos/EquipoForm";

export default function NuevoEquipo() {

  const router = useRouter();

  const [loading, setLoading] = useState(false);

  async function guardarEquipo(data: Equipo) {

    try {

      setLoading(true);

      await crearEquipo(data);

      alert("Equipo registrado correctamente.");

      router.push("/equipos");

      router.refresh();

    } catch (error: any) {

      console.error(error);

      alert(
        error?.message ??
        "Ocurrió un error al guardar el equipo."
      );

    } finally {

      setLoading(false);

    }

  }

  return (

    <div className="max-w-3xl mx-auto p-8">

      <h1 className="text-3xl font-bold mb-8">
        Nuevo Equipo
      </h1>

      <EquipoForm
        onSubmit={guardarEquipo}
        loading={loading}
      />

    </div>

  );

}