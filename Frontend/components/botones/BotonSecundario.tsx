import Link from "next/link";

interface Props {
  href: string;
  texto: string;
  color?:
    | "gray"
    | "blue"
    | "red"
    | "green"
    | "amber"
    | "slate"
    | "indigo"
    | "purple";
}

export default function BotonSecundario({
  href,
  texto,
  color = "gray",
}: Props) {

  const colores = {
    gray: "bg-gray-600 hover:bg-gray-700",
    blue: "bg-blue-600 hover:bg-blue-700",
    red: "bg-red-600 hover:bg-red-700",
    green: "bg-green-600 hover:bg-green-700",
    amber: "bg-amber-500 hover:bg-amber-600",
    slate: "bg-slate-700 hover:bg-slate-800",
    indigo: "bg-indigo-600 hover:bg-indigo-700",
    purple: "bg-purple-600 hover:bg-purple-700",
  };

  return (
    <Link
      href={href}
      className={`
        ${colores[color]}
        text-white
        px-5
        py-3
        rounded-lg
        shadow-md
        hover:shadow-lg
        transition-all
        duration-200
        font-medium
      `}
    >
      {texto}
    </Link>
  );
}