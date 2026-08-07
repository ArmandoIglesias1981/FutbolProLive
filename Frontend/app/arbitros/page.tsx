import AdminLayout from "@/components/estadisticas/layout/AdminLayout";
import ResumenEstadisticas from "@/components/estadisticas/ResumenEstadisticas";
import BotonNuevo from "@/components/botones/BotonNuevo";
import BotonSecundario from "@/components/botones/BotonSecundario";
import BarraBusqueda from "@/components/tabla/BarraBusqueda";
import SelectorRegistros from "@/components/tabla/SelectorRegistros";
import Paginacion from "@/components/tabla/Paginacion";
import ExportarExcel from "@/components/exportar/ExportarExcel";
import TablaArbitros from "@/components/TablaArbitros";

import {
  obtenerArbitros,
  obtenerResumenArbitros,
  obtenerTodosArbitros,
} from "@/services/api";


interface Props {
  searchParams: Promise<{
    buscar?: string;
    page?: string;
    limit?: string;
    sort?: string;
    order?: "asc" | "desc";
  }>;
}

export default async function ArbitrosPage({
  searchParams,
}: Props) {

  const params = await searchParams;

  const buscar = params.buscar ?? "";
  const page = Number(params.page ?? "1");
  const limit = Number(params.limit ?? "10");
  const sort = params.sort ?? "id_arbitro";
  const order = (params.order as "asc" | "desc") ?? "asc";

  const respuesta = await obtenerArbitros(
    buscar,
    page,
    limit,
    sort,
    order
  );

  const resumen = await obtenerResumenArbitros();

  return (

    <AdminLayout

      titulo="Gestión de Árbitros"

      descripcion="Administra todos los árbitros."

      acciones={

        <div className="flex justify-between items-center w-full">

          <div className="flex gap-4">

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
              href="/arbitros/inactivos"
              texto="📂 Inactivos"
              color="amber"
            />

            <BotonNuevo
              href="/arbitros/nuevo"
              texto="➕ Nuevo Árbitro"
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
          nombreArchivo="Arbitros"
        />

      }

      tabla={

        <>
          <TablaArbitros
            arbitros={respuesta.data}
          />

          <Paginacion
            page={respuesta.page}
            totalPages={respuesta.totalPages}
            total={respuesta.total}
            limit={respuesta.limit}
            ruta="/arbitros"
          />
        </>

      }

    />

  );

}