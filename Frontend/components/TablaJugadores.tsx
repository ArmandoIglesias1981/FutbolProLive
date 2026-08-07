import TablaBase from "@/components/tabla/TablaBase";
import EncabezadoOrdenable from "@/components/tabla/EncabezadoOrdenable";
import AccionesTabla from "@/components/acciones/AccionesTabla";
import EliminarJugador from "./EliminarJugador";

type Jugador = {
  id_jugador: number;
  foto?: string | null;
  nombres: string;
  apellidos: string;
  documento: string;
  fecha_nacimiento: string;
  edad: string;
  posicion: string;
  dorsal: number;
  nacionalidad: string;
  activo: boolean;

  equipo: {
    id_equipo: number;
    nombre: string;
  };
};

interface Props {
  jugadores: Jugador[];
}

export default function TablaJugadores({
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
      id: "nombre",
      encabezado: (
        <EncabezadoOrdenable
          campo="nombres"
          titulo="Jugador"
        />
      ),
      render: (jugador: Jugador) => (
        <strong>
          {jugador.nombres} {jugador.apellidos}
        </strong>
      ),
    },


    {
      id: "documento",
      encabezado: (
        <EncabezadoOrdenable
          campo="documento"
          titulo="Documento"
        />
      ),
      render: (jugador: Jugador) => jugador.documento,
    },


    {
      id: "fecha_nacimiento",
      encabezado: (
        <EncabezadoOrdenable
          campo="fecha_nacimiento"
          titulo="Fecha Nacimiento"
        />
      ),
      render: (jugador: Jugador) =>
        new Date(
          jugador.fecha_nacimiento
        ).toLocaleDateString("es-CO"),
    },


    {
      id: "edad",
      encabezado: "Edad",
      render: (jugador: Jugador) =>
        jugador.edad,
    },


    {
      id: "equipo",
      encabezado: (
        <EncabezadoOrdenable
          campo="id_equipo"
          titulo="Equipo"
        />
      ),
      render: (jugador: Jugador) =>
        jugador.equipo.nombre,
    },

    {
      id: "posicion",
      encabezado: (
        <EncabezadoOrdenable
          campo="posicion"
          titulo="Posición"
        />
      ),
      render: (jugador: Jugador) =>
        jugador.posicion,
    },

    {
      id: "dorsal",
      encabezado: (
        <EncabezadoOrdenable
          campo="dorsal"
          titulo="Dorsal"
        />
      ),
      render: (jugador: Jugador) =>
        jugador.dorsal,
    },


    {
      id: "nacionalidad",
      encabezado: (
        <EncabezadoOrdenable
          campo="nacionalidad"
          titulo="Nacionalidad"
        />
      ),
      render: (jugador: Jugador) =>
        jugador.nacionalidad,
    },


    {
      id: "estado",
      encabezado: "Estado",
      render: (jugador: Jugador) => (

        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            jugador.activo
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >

          {jugador.activo
            ? "🟢 Activo"
            : "🔴 Inactivo"}

        </span>

      ),
    },


    {
      id: "acciones",
      encabezado: "Acciones",
      render: (jugador: Jugador) => (
        <AccionesTabla
          editar={`/jugadores/editar/${jugador.id_jugador}`}
          eliminar={
            <EliminarJugador
              id={jugador.id_jugador}
            />
          }
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