import AdminLayout from "@/components/estadisticas/layout/AdminLayout";
import FormularioEstadios from "@/components/FormularioEstadios";

export default function NuevoEstadioPage() {

  return (

    <AdminLayout

      titulo="Nuevo Estadio"

      descripcion="Registrar un nuevo estadio."

      tabla={<FormularioEstadios />}

    />

  );

}