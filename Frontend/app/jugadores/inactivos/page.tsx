import TablaJugadoresInactivos from "@/components/TablaJugadoresInactivos";
import BotonSecundario from "@/components/botones/BotonSecundario";
import AdminLayout from "@/components/estadisticas/layout/AdminLayout";
import { obtenerJugadoresInactivos } from "@/services/api";

export default async function JugadoresInactivosPage() {

  const jugadores =
    await obtenerJugadoresInactivos();

  return (

    <AdminLayout

      titulo="Jugadores Inactivos"

      descripcion="Jugadores eliminados lógicamente."

      acciones={
        <BotonSecundario
          href="/jugadores"
          texto="⬅ Volver"
          color="blue"
        />
      }

      tabla={
        <TablaJugadoresInactivos
          jugadores={jugadores}
        />
      }

    />

  );

}