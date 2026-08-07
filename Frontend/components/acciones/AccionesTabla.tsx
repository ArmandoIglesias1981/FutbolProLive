"use client";

import Link from "next/link";
import { ReactNode } from "react";

interface Props {
  editar: string;
  eliminar: ReactNode;
}

export default function AccionesTabla({
  editar,
  eliminar,
}: Props) {
  return (
    <div className="flex justify-center gap-2">

      <Link
        href={editar}
        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded-md transition"
      >
        ✏️ Editar
      </Link>

      {eliminar}

    </div>
  );
}