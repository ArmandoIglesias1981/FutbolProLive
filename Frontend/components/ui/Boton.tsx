interface BotonProps {
  children: React.ReactNode;
  onClick?: () => void;
  color?: "blue" | "green" | "red" | "yellow";
  type?: "button" | "submit";
}

export default function Boton({
  children,
  onClick,
  color = "blue",
  type = "button",
}: BotonProps) {
  const colores = {
    blue: "bg-blue-600 hover:bg-blue-700",
    green: "bg-green-600 hover:bg-green-700",
    red: "bg-red-600 hover:bg-red-700",
    yellow: "bg-yellow-500 hover:bg-yellow-600",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${colores[color]} text-white px-4 py-2 rounded-lg transition shadow`}
    >
      {children}
    </button>
  );
}