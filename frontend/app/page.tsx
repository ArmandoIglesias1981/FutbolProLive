import MainLayout from "../components/MainLayout";
import Card from "../components/Card";
import Link from "next/link";

export default function Home() {

  return (

    <MainLayout>

      <h2 className="text-3xl font-bold mb-6">
        FutbolPro Live
      </h2>

      <p className="text-gray-600 mb-6">
        Gestor Inteligente de Torneos
      </p>

      {/* Resumen */}

      <div className="grid grid-cols-4 gap-6">

        <Card
          titulo="Torneos Activos"
          valor="12"
        />

        <Card
          titulo="Equipos"
          valor="96"
        />

        <Card
          titulo="Jugadores"
          valor="1800"
        />

        <Card
          titulo="Partidos"
          valor="450"
        />

      </div>

      {/* Accesos rápidos */}

      <h3 className="text-2xl font-bold mt-10 mb-5">
        Módulos del Sistema
      </h3>

      <div className="grid grid-cols-4 gap-6">

        <Link
          href="/equipos"
          className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition"
        >
          <div className="text-5xl mb-4">🏆</div>

          <h3 className="font-bold text-xl">
            Equipos
          </h3>

          <p className="text-gray-600 mt-2">
            Gestión de equipos
          </p>
        </Link>

        <Link
          href="/jugadores"
          className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition"
        >
          <div className="text-5xl mb-4">⚽</div>

          <h3 className="font-bold text-xl">
            Jugadores
          </h3>

          <p className="text-gray-600 mt-2">
            Gestión de jugadores
          </p>
        </Link>

        <Link
          href="/arbitros"
          className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition"
        >
          <div className="text-5xl mb-4">🧑‍⚖️</div>

          <h3 className="font-bold text-xl">
            Árbitros
          </h3>

          <p className="text-gray-600 mt-2">
            Gestión de árbitros
          </p>
        </Link>

        <Link
          href="/torneos"
          className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition"
        >
          <div className="text-5xl mb-4">🏅</div>

          <h3 className="font-bold text-xl">
            Torneos
          </h3>

          <p className="text-gray-600 mt-2">
            Gestión de torneos
          </p>
        </Link>

        <Link
          href="/estadios"
          className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition"
        >

          <div className="text-5xl mb-4">
            🏟️
          </div>

          <h3 className="font-bold text-xl">
            Estadios
          </h3>

          <p className="text-gray-600 mt-2">
            Gestión de estadios
          </p>

        </Link>


      </div>

      {/* Panel inferior */}

      <div className="grid grid-cols-2 gap-6 mt-10">

        <div className="bg-white rounded-xl shadow p-5">

          <h3 className="font-bold text-xl mb-3">
            Tabla de Posiciones
          </h3>

          <p>
            Próximamente se mostrará la tabla de posiciones.
          </p>

        </div>

        <div className="bg-white rounded-xl shadow p-5">

          <h3 className="font-bold text-xl mb-3">
            Partidos en Vivo
          </h3>

          <p>
            Próximamente se mostrarán los resultados en tiempo real.
          </p>

        </div>

      </div>

    </MainLayout>

  );

}