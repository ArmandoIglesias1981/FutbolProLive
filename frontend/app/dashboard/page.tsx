import MainLayout from "@/components/MainLayout";
import Card from "@/components/Card";

export default function Dashboard() {
  return (
    <MainLayout>

      <h2 className="text-3xl font-bold mb-6">
        Dashboard
      </h2>

      <div className="grid grid-cols-4 gap-6">

        <Card
          titulo="Torneos"
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

    </MainLayout>
  );
}