import Link from "next/link";
import { obtenerEquiposInactivos } from "@/services/api";
import TablaEquiposInactivos from "@/components/TablaEquiposInactivos";

export default async function EquiposInactivosPage() {

  const equipos = await obtenerEquiposInactivos();

  return (

    <div className="p-8 bg-gray-100 min-h-screen">

      <div className="flex justify-between items-center mb-8">

        <div>

          <h1 className="text-4xl font-bold text-gray-800">
            Equipos Inactivos
          </h1>

          <p className="text-gray-500 mt-2">
            Equipos desactivados del sistema.
          </p>

        </div>

        <Link
          href="/equipos"
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg"
        >
          ← Volver
        </Link>

      </div>

      <TablaEquiposInactivos equipos={equipos} />

    </div>

  );

}