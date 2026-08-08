import AdminLayout from "@/components/estadisticas/layout/AdminLayout";
import BarraFiltros from "@/components/tabla/BarraFiltros";
import TablaEquipos from "@/components/TablaEquipos";
import {obtenerEquipos, obtenerResumenEquipos} from "@/services/api";
import Paginacion from "@/components/tabla/Paginacion";
import ExportarExcel from "@/components/exportar/ExportarExcel";
import BotonNuevo from "@/components/botones/BotonNuevo";
import BotonSecundario from "@/components/botones/BotonSecundario";
import ResumenEstadisticas from "@/components/estadisticas/ResumenEstadisticas";
import Link from "next/link";

interface Props {
  searchParams: Promise<{
    buscar?: string;
    page?: string;
    limit?: string;
    sort?: string;
    order?: "asc" | "desc";
  }>;
}

export default async function EquiposPage({
  searchParams,
}: Props) {

  const params = await searchParams;

  const buscar = params.buscar ?? "";
  const page = Number(params.page ?? "1");
  const limit = Number(params.limit ?? "10");

  // NUEVO
  const sort = params.sort ?? "id_equipo";
  const order = (params.order as "asc" | "desc") ?? "asc";

  const resultado = await obtenerEquipos(
    buscar,
    page,
    limit,
    sort,
    order,
  );
  const resumen = await obtenerResumenEquipos();
  const equipos = resultado.data;

  return (

    <AdminLayout

      titulo="Gestión de Equipos"

      descripcion="Administra todos los equipos registrados."

      acciones={

        <div className="flex gap-3">

          <BotonSecundario
            href="/"
            texto="🏠 Dashboard"
            color="blue"
          />

          <BotonSecundario
            href="/equipos/inactivos"
            texto="📂 Equipos Inactivos"
            color="amber"
          />

          <BotonNuevo
            href="/equipos/nuevo"
            texto="➕ Nuevo Equipo"
          />

        </div>

      }

      filtros={

        <BarraFiltros
          total={resultado.total}
        />

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
          datos={equipos}
          nombreArchivo="Equipos"
        />

      }

      tabla={

        <TablaEquipos
          equipos={equipos}
        />

      }

      paginacion={

        <Paginacion
          page={resultado.page}
          totalPages={resultado.totalPages}
          total={resultado.total}
          limit={resultado.limit}
          ruta="/equipos"
        />

      }

    />

  );
}