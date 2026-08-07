import Link from "next/link";

interface Props {
  href: string;
  texto: string;
}

export default function BotonNuevo({
  href,
  texto,
}: Props) {
  return (
    <Link
      href={href}
      className="
        bg-green-600
        hover:bg-green-700
        text-white
        px-5
        py-3
        rounded-lg
        shadow
        transition
      "
    >
      + {texto}
    </Link>
  );
}