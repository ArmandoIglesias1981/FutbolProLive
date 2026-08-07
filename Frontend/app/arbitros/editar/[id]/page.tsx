import AdminLayout from "@/components/estadisticas/layout/AdminLayout";
import FormularioArbitros from "@/components/FormularioArbitros";
import { obtenerArbitro } from "@/services/api";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditarArbitroPage({
  params,
}: Props) {

  const { id } = await params;

  const arbitro = await obtenerArbitro(Number(id));

  return (
    <AdminLayout
      titulo="Editar Árbitro"
      descripcion="Actualiza la información del árbitro."
      tabla={
        <FormularioArbitros
          arbitro={arbitro}
        />
      }
    />
  );
}