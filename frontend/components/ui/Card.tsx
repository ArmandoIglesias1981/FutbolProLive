interface Props {
  children: React.ReactNode;
}

export default function Card({
  children,
}: Props) {

  return (

    <div
      className="
        bg-white
        rounded-xl
        shadow-lg
        p-8
      "
    >

      {children}

    </div>

  );

}