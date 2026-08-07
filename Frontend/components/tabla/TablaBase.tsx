interface Columna<T> {
  id: string;
  encabezado: React.ReactNode;
  render: (fila: T) => React.ReactNode;
}

interface Props<T> {
  columnas: Columna<T>[];
  datos: T[];
}

export default function TablaBase<T>({
  columnas,
  datos,
}: Props<T>) {

  return (

    <div className="bg-white rounded-xl shadow-lg overflow-hidden">

      <div className="overflow-x-auto">

        <table className="min-w-full">

          <thead className="bg-blue-700 text-white">
            <tr>
              {columnas.map((columna) => (
                <th
                  key={columna.id}
                  className="px-4 py-3 text-left whitespace-nowrap"
                >
                  {columna.encabezado}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {datos.map((fila, index) => (
              <tr
                key={index}
                className="border-b hover:bg-gray-100 transition"
              >
                {columnas.map((columna) => (
                  <td
                    key={columna.id}
                    className="px-4 py-3 whitespace-nowrap"
                  >
                    {columna.render(fila)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>

        </table>

      </div>

    </div>

  );

}