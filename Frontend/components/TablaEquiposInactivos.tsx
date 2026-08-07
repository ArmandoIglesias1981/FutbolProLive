"use client";

import RestaurarEquipo from "./RestaurarEquipo";

type Equipo = {
  id_equipo: number;
  nombre: string;
  ciudad?: string | null;
  director_tecnico?: string | null;
  id_tecnico?: string | null;
  cel_tecnico?: string | null;
  correo_tecnico?: string | null;
  presidente?: string | null;
  escudo?: string | null;
  fecha_registro?: string | null;
  activo: boolean;
};

interface Props {
  equipos: Equipo[];
}

export default function TablaEquiposInactivos({
  equipos,
}: Props) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-x-auto">

      <table className="min-w-full">

        <thead className="bg-gray-700 text-white">

          <tr>

            <th className="px-4 py-3">Escudo</th>

            <th className="px-4 py-3">ID</th>

            <th className="px-4 py-3">Equipo</th>

            <th className="px-4 py-3">Ciudad</th>

            <th className="px-4 py-3">
              Director Técnico
            </th>

            <th className="px-4 py-3">
              Identificación
            </th>

            <th className="px-4 py-3">
              Celular
            </th>

            <th className="px-4 py-3">
              Correo
            </th>

            <th className="px-4 py-3">
              Presidente
            </th>

            <th className="px-4 py-3">
              Fecha Registro
            </th>

            <th className="px-4 py-3">
              Estado
            </th>

            <th className="px-4 py-3">
              Acción
            </th>

          </tr>

        </thead>

        <tbody>

          {equipos.map((equipo) => (

            <tr
              key={equipo.id_equipo}
              className="border-b hover:bg-gray-50"
            >

              <td className="px-4 py-3 text-center">

                {equipo.escudo ? (

                  <img
                    src={equipo.escudo}
                    alt={equipo.nombre}
                    className="w-14 h-14 object-contain rounded-lg border bg-white p-1 mx-auto"
                  />

                ) : (

                  <span className="text-gray-400 text-sm">
                    Sin escudo
                  </span>

                )}

              </td>

              <td className="px-4 py-3">
                {equipo.id_equipo}
              </td>

              <td className="px-4 py-3 font-semibold">
                {equipo.nombre}
              </td>

              <td className="px-4 py-3">
                {equipo.ciudad ?? "-"}
              </td>

              <td className="px-4 py-3">
                {equipo.director_tecnico ?? "-"}
              </td>

              <td className="px-4 py-3">
                {equipo.id_tecnico ?? "-"}
              </td>

              <td className="px-4 py-3">
                {equipo.cel_tecnico ?? "-"}
              </td>

              <td className="px-4 py-3">
                {equipo.correo_tecnico ?? "-"}
              </td>

              <td className="px-4 py-3">
                {equipo.presidente ?? "-"}
              </td>

              <td className="px-4 py-3">

                {equipo.fecha_registro
                  ? new Date(
                      equipo.fecha_registro
                    ).toLocaleDateString("es-CO")
                  : "-"}

              </td>

              <td className="px-4 py-3">

                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700">

                  🔴 Inactivo

                </span>

              </td>

              <td className="px-4 py-3">

                <RestaurarEquipo
                  id={equipo.id_equipo}
                />

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}