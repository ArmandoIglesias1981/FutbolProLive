interface Props {
  children: React.ReactNode;
}

export default function Titulo({
  children,
}: Props) {

  return (

    <h1
      className="
        text-3xl
        font-bold
        text-blue-700
        mb-8
      "
    >

      {children}

    </h1>

  );

}