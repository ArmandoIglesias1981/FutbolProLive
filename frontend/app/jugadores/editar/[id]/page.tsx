import FormularioJugador from "@/components/FormularioJugador";
import { obtenerJugador } from "@/services/api";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditarJugadorPage({
  params,
}: Props) {

  const { id } = await params;

  const jugador = await obtenerJugador(Number(id));

  return (
    <FormularioJugador
      initialData={jugador}
    />
  );

}