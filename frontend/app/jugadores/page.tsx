import AdminLayout from "@/components/estadisticas/layout/AdminLayout";
import ResumenEstadisticas from "@/components/estadisticas/ResumenEstadisticas";
import BotonNuevo from "@/components/botones/BotonNuevo";
import BotonSecundario from "@/components/botones/BotonSecundario";
import TablaJugadores from "@/components/TablaJugadores";
import BarraBusqueda from "@/components/tabla/BarraBusqueda";
import Paginacion from "@/components/tabla/Paginacion";
import SelectorRegistros from "@/components/tabla/SelectorRegistros";
import ExportarExcel from "@/components/exportar/ExportarExcel";

import {
  obtenerJugadores,
  obtenerResumenJugadores,
} from "@/services/api";

interface Props {
  searchParams: Promise<{
    buscar?: string;
    page?: string;
    limit?: string;
    sort?: string;
    order?: string;
  }>;
}


export default async function JugadoresPage({
  searchParams,
}: Props) {

  const params = await searchParams;
  const buscar = params.buscar ?? "";
  const page = Number(params.page ?? "1");
  const limit = Number(params.limit ?? "10");
  const sort = params.sort ?? "id_jugador";
  const order = params.order ?? "asc";
  const respuesta = await obtenerJugadores(
    buscar,
    page,
    limit,
    sort,
    order
  );

  const resumen = await obtenerResumenJugadores();

  return (

    <AdminLayout

      titulo="Gestión de Jugadores"

      descripcion="Administra todos los jugadores registrados."


      acciones={
        <div className="flex justify-between items-center w-full">

          <div className="flex items-center gap-4">
            <BarraBusqueda />
            <SelectorRegistros />
          </div>

          

          <div className="flex gap-3">
            <BotonSecundario
              href="/"
              texto="🏠 Dashboard"
              color="blue"
            />
            <BotonSecundario
              href="/jugadores/inactivos"
              texto="📂 Jugadores Inactivos"
              color="amber"
            />
            <BotonNuevo
              href="/jugadores/nuevo"
              texto="➕ Nuevo Jugador"
            />
          </div>










        </div>
      }


      resumen={

        <ResumenEstadisticas
          total={resumen.total}
          activos={resumen.activos}
          inactivos={resumen.inactivos}
        />

      }

      exportar={
        <ExportarExcel
          datos={respuesta.data}
          nombreArchivo="Jugadores"
        />
      }

      tabla={
        <>
          <TablaJugadores
            jugadores={respuesta.data}
          />

          <Paginacion
            page={respuesta.page}
            totalPages={respuesta.totalPages}
            total={respuesta.total}
            limit={respuesta.limit}
            ruta="/jugadores"
          />
        </>
      }
      
    />
  );
}