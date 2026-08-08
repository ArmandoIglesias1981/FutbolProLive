import TablaBase from "@/components/tabla/TablaBase";
import RestaurarJugador from "./RestaurarJugador";

type Jugador = {
  id_jugador: number;
  foto?: string | null;
  nombres: string;
  apellidos: string;
  documento: string;
  posicion: string;
  dorsal: number;
  nacionalidad: string;

  equipo: {
    id_equipo: number;
    nombre: string;
  };
};

interface Props {
  jugadores: Jugador[];
}

export default function TablaJugadoresInactivos({
  jugadores,
}: Props) {

  const columnas = [

    {
      id: "foto",
      encabezado: "Foto",
      render: (jugador: Jugador) =>
        jugador.foto ? (
          <img
            src={jugador.foto}
            alt={jugador.nombres}
            className="w-14 h-14 rounded-full object-cover"
          />
        ) : (
          <span className="text-gray-400">
            Sin foto
          </span>
        ),
    },

    {
      id: "jugador",
      encabezado: "Jugador",
      render: (jugador: Jugador) => (
        <strong>
          {jugador.nombres} {jugador.apellidos}
        </strong>
      ),
    },

    {
      id: "documento",
      encabezado: "Documento",
      render: (jugador: Jugador) =>
        jugador.documento,
    },

    {
      id: "equipo",
      encabezado: "Equipo",
      render: (jugador: Jugador) =>
        jugador.equipo.nombre,
    },

    {
      id: "posicion",
      encabezado: "Posición",
      render: (jugador: Jugador) =>
        jugador.posicion,
    },

    {
      id: "acciones",
      encabezado: "Acciones",
      render: (jugador: Jugador) => (
        <RestaurarJugador
          id={jugador.id_jugador}
        />
      ),
    },

  ];

  return (
    <TablaBase
      columnas={columnas}
      datos={jugadores}
    />
  );

}