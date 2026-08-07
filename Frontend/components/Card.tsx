type CardProps = {
  titulo: string;
  valor: string;
};

export default function Card({
  titulo,
  valor,
}: CardProps) {
  return (
    <div className="bg-white rounded-xl shadow p-6">

      <h3 className="text-gray-500">
        {titulo}
      </h3>

      <p className="text-4xl font-bold mt-2">
        {valor}
      </p>

    </div>
  );
}
<div className="grid grid-cols-2 gap-6 mt-6">

  <div className="bg-white rounded-xl shadow p-5">
    Tabla de Posiciones
  </div>

  <div className="bg-white rounded-xl shadow p-5">
    Partidos en Vivo
  </div>

</div>