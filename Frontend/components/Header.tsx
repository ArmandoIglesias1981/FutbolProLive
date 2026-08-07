export default function Header() {
  return (
    <header className="bg-white shadow px-6 py-4 flex justify-between items-center">

      <div>
        <h1 className="text-2xl font-bold">
          FutbolPro Live
        </h1>

        <p className="text-sm text-gray-500">
          Gestor Inteligente de Torneos
        </p>
      </div>

      <div className="font-semibold">
        Administrador
      </div>

    </header>
  );
}