import Link from "next/link";

import AdminLayout from "@/components/estadisticas/layout/AdminLayout";
import TablaEstadiosInactivos from "@/components/TablaEstadiosInactivos";

import {
  obtenerEstadiosInactivos,
} from "@/services/api";

export default async function EstadiosInactivosPage() {

  const estadios =
    await obtenerEstadiosInactivos();

  return (

    <AdminLayout

      titulo="Estadios Inactivos"

      descripcion="Listado de estadios inactivos."

      acciones={

        <Link
          href="/estadios"
          className="bg-gray-700 text-white px-5 py-3 rounded-lg"
        >
          ← Volver
        </Link>

      }

      tabla={

        <TablaEstadiosInactivos
          estadios={estadios}
        />

      }

    />

  );

}