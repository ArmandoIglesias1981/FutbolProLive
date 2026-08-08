import AdminLayout from "@/components/estadisticas/layout/AdminLayout";
import FormularioArbitros from "@/components/FormularioArbitros";

export default function NuevoArbitroPage() {

  return (

    <AdminLayout

      titulo="Nuevo Árbitro"

      descripcion="Registrar un nuevo árbitro."

      tabla={

        <FormularioArbitros />

      }

    />

  );

}