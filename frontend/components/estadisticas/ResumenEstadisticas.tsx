import TarjetaEstadistica from "./TarjetaEstadistica";

interface Props {
  total: number;
  activos: number;
  inactivos: number;
}

export default function ResumenEstadisticas({
  total,
  activos,
  inactivos,
}: Props) {

  return (

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

      <TarjetaEstadistica
        titulo="Total"
        valor={total}
        color="blue"
      />

      <TarjetaEstadistica
        titulo="Activos"
        valor={activos}
        color="green"
      />

      <TarjetaEstadistica
        titulo="Inactivos"
        valor={inactivos}
        color="red"
      />

    </div>

  );

}