interface Props {
  titulo: string;
  valor: number;
  color?: "blue" | "green" | "red" | "yellow";
}

export default function TarjetaEstadistica({
  titulo,
  valor,
  color = "blue",
}: Props) {

  const colores = {
    blue: "bg-blue-600",
    green: "bg-green-600",
    red: "bg-red-600",
    yellow: "bg-yellow-500",
  };

  return (

    <div className="bg-white rounded-xl shadow-md overflow-hidden">

      <div className={`${colores[color]} h-2`} />

      <div className="p-6">

        <p className="text-gray-500 text-sm">
          {titulo}
        </p>

        <h2 className="text-3xl font-bold text-gray-800 mt-2">
          {valor}
        </h2>

      </div>

    </div>

  );

}