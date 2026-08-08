"use client";

import { useRouter, useSearchParams } from "next/navigation";

interface Props {
  page: number;
  totalPages: number;
  total: number;
  limit: number;
  ruta: string;
}

export default function Paginacion({
  page,
  totalPages,
  total,
  limit,
  ruta,
}: Props) {

  const router = useRouter();
  const params = useSearchParams();

  // Registros mostrados
  const inicioRegistro = (page - 1) * limit + 1;
  const finRegistro = Math.min(page * limit, total);

  // Páginas a mostrar
  const paginas: (number | string)[] = [];

  if (totalPages <= 7) {

    for (let i = 1; i <= totalPages; i++) {
      paginas.push(i);
    }

  } else {

    paginas.push(1);

    if (page > 4) {
      paginas.push("...");
    }

    const paginaInicio = Math.max(2, page - 1);
    const paginaFin = Math.min(totalPages - 1, page + 1);

    for (let i = paginaInicio; i <= paginaFin; i++) {
      paginas.push(i);
    }

    if (page < totalPages - 3) {
      paginas.push("...");
    }

    paginas.push(totalPages);

  }

  function irA(nuevaPagina: number) {

    const search = new URLSearchParams(params);

    search.set("page", nuevaPagina.toString());

    router.push(`${ruta}?${search.toString()}`);

  }

  return (

    <div className="mt-8">

      <div className="text-gray-600 mb-3">

        Mostrando

        <strong> {inicioRegistro} </strong>

        -

        <strong> {finRegistro} </strong>

        de

        <strong> {total} </strong>

        registros

      </div>

      <div className="flex justify-center items-center gap-2">

        <button
          onClick={() => irA(1)}
          disabled={page === 1}
          className="px-3 py-2 border rounded disabled:opacity-40"
        >
          ⏮
        </button>

        <button
          onClick={() => irA(page - 1)}
          disabled={page === 1}
          className="px-3 py-2 border rounded disabled:opacity-40"
        >
          ◀
        </button>

        <div className="flex gap-1">

          {paginas.map((item, index) =>

            item === "..." ? (

              <span
                key={index}
                className="px-2 text-gray-500"
              >
                ...
              </span>

            ) : (

              <button
                key={item}
                onClick={() => irA(item as number)}
                className={`px-3 py-2 rounded border transition ${
                  item === page
                    ? "bg-blue-700 text-white shadow-lg scale-110"
                    : "bg-white hover:bg-gray-100"
                }`}
              >
                {item}
              </button>

            )

          )}

        </div>

        <button
          onClick={() => irA(page + 1)}
          disabled={page === totalPages}
          className="px-3 py-2 border rounded disabled:opacity-40"
        >
          ▶
        </button>

        <button
          onClick={() => irA(totalPages)}
          disabled={page === totalPages}
          className="px-3 py-2 border rounded disabled:opacity-40"
        >
          ⏭
        </button>

      </div>

    </div>

  );

}