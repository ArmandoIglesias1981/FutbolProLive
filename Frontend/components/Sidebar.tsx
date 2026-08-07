import Link from "next/link";
import {
  FaHome,
  FaTrophy,
  FaUsers,
  FaFutbol,
  FaClipboardList,
} from "react-icons/fa";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-slate-900 text-white">

      <div className="p-5 text-2xl font-bold border-b border-slate-700">
        FutbolPro
      </div>

      <nav className="p-4">

        <ul className="space-y-3">

          <li>
            <Link
              href="/dashboard"
              className="flex items-center gap-3 hover:bg-slate-700 p-2 rounded"
            >
              <FaHome />
              Dashboard
            </Link>
          </li>

          <li>
            <Link
              href="/torneos"
              className="flex items-center gap-3 hover:bg-slate-700 p-2 rounded"
            >
              <FaTrophy />
              Torneos
            </Link>
          </li>

          <li>
            <Link
              href="/equipos"
              className="flex items-center gap-3 hover:bg-slate-700 p-2 rounded"
            >
              <FaUsers />
              Equipos
            </Link>
          </li>

          <li>
            <Link
              href="/jugadores"
              className="flex items-center gap-3 hover:bg-slate-700 p-2 rounded"
            >
              <FaFutbol />
              Jugadores
            </Link>
          </li>

          <li>
            <Link
              href="/partidos"
              className="flex items-center gap-3 hover:bg-slate-700 p-2 rounded"
            >
              <FaClipboardList />
              Partidos
            </Link>
          </li>

        </ul>

      </nav>

    </aside>
  );
}
<div className="p-5 border-b border-slate-700">

  <h2 className="text-2xl font-bold">
    FutbolPro
  </h2>

  <p className="text-sm text-gray-300">
    Gestión Deportiva
  </p>

</div>