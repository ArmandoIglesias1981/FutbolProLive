export interface Jugador {
  id_jugador?: number;

  nombres: string;
  apellidos: string;
  documento: string;

  fecha_nacimiento: string;
  edad?: string;

  posicion: string;
  dorsal: number;
  nacionalidad: string;

  activo: boolean;

  id_equipo: number;

  foto?: string | null;

  equipo?: {
    id_equipo: number;
    nombre: string;
  };
}