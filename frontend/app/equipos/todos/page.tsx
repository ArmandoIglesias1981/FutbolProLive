import Link from "next/link";
import { obtenerTodosEquipos } from "@/services/api";
import TablaEquipos from "@/components/TablaEquipos";

export default async function TodosEquiposPage() {

  const equipos = await obtenerTodosEquipos();

  return (

    <div className="p-8 bg-gray-100 min-h-screen">

      <div className="flex justify-between items-center mb-8">

        <div>

          <h1 className="text-4xl font-bold">
            Todos los Equipos
          </h1>

          <p className="text-gray-500">
            Equipos activos e inactivos.
          </p>

        </div>

        <Link
          href="/equipos"
          className="bg-blue-600 text-white px-5 py-3 rounded-lg"
        >
          ← Volver
        </Link>

      </div>

      <TablaEquipos equipos={equipos} />

    </div>

  );

}