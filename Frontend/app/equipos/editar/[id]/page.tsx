import { obtenerEquipo } from "@/services/api";
import EditarEquipoClient from "./EditarEquipoClient";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function Page({
  params,
}: Props) {

  const { id } = await params;

  const equipo = await obtenerEquipo(
    Number(id)
  );

  return (
    <EditarEquipoClient
      equipo={equipo}
    />
  );

}