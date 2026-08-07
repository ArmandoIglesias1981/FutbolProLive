import AdminLayout from "@/components/estadisticas/layout/AdminLayout";

import FormularioEstadios from "@/components/FormularioEstadios";

import {
  obtenerEstadio,
} from "@/services/api";

interface Props {

  params: Promise<{
    id: string;
  }>;

}

export default async function EditarEstadioPage({

  params,

}: Props) {

  const { id } = await params;

  const estadio =
    await obtenerEstadio(Number(id));

  return (

    <AdminLayout

      titulo="Editar Estadio"

      descripcion="Actualizar información del estadio."

      tabla={

        <FormularioEstadios
          estadio={estadio}
        />

      }

    />

  );

}