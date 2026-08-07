"use client";

import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

interface Props {
  datos: any[];
  nombreArchivo: string;
}

export default function ExportarExcel({
  datos,
  nombreArchivo,
}: Props) {

  function exportar() {

    const worksheet = XLSX.utils.json_to_sheet(datos);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      nombreArchivo
    );

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const archivo = new Blob(
      [excelBuffer],
      {
        type:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      }
    );

    saveAs(
      archivo,
      `${nombreArchivo}.xlsx`
    );
  }

  return (
    <button
      onClick={exportar}
      className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-lg shadow transition"
    >
      📄 Exportar Excel
    </button>
  );

}