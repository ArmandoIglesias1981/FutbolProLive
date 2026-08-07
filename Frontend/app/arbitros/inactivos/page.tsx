import AdminLayout from "@/components/estadisticas/layout/AdminLayout";
import TablaArbitrosInactivos from "@/components/TablaArbitrosInactivos";
import Link from "next/link";

import {
  obtenerArbitrosInactivos,
} from "@/services/api";

export default async function ArbitrosInactivosPage() {

  const arbitros =
    await obtenerArbitrosInactivos();

  return (

    <AdminLayout
      titulo="Árbitros Inactivos"
      descripcion="Listado de árbitros eliminados lógicamente."

      acciones={
        <Link
          href="/arbitros"
          className="bg-gray-600 hover:bg-gray-700 text-white px-5 py-3 rounded-lg"
        >
          ← Volver
        </Link>
      }

      tabla={
        <TablaArbitrosInactivos
          arbitros={arbitros}
        />
      }
    />

  );

}