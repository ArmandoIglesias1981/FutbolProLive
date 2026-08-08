import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { QueryJugadorDto } from "./dto/query-jugador.dto";
import { CreateJugadorDto } from "./dto/create-jugador.dto";
import { calcularEdad } from "../common/utils/calcular-edad";
import { Prisma, Posicion } from "@prisma/client";

@Injectable()
export class JugadoresService {

  constructor(
  private prisma:PrismaService
  ){}



  async crear(dto:CreateJugadorDto){
  return this.prisma.jugador.create({
  data:{
    ...dto,
    fecha_nacimiento:new Date(dto.fecha_nacimiento)
  }
  });
  }






  async listar(query: QueryJugadorDto) {

    const {
      buscar = "",
      page = "1",
      limit = "10",
      sort = "id_jugador",
      order = "asc",
    } = query;

    const pagina = Number(page);
    const limite = Number(limit);

    const textoBuscar = buscar.trim().toUpperCase();
    const posicionEncontrada = Object.values(Posicion).find(
      (posicion) => posicion.startsWith(textoBuscar)
    );

    const where: Prisma.jugadorWhereInput = {
      activo: true,

      ...(buscar && {
        OR: [
          {
            nombres: {
              contains: buscar,
              mode: "insensitive",
            },
          },
          {
            apellidos: {
              contains: buscar,
              mode: "insensitive",
            },
          },
          {
            documento: {
              contains: buscar,
              mode: "insensitive",
            },
          },





          ...(posicionEncontrada
          ? [
              {
                posicion: posicionEncontrada,
              },
            ]
          : []),






          {
            nacionalidad: {
              contains: buscar,
              mode: "insensitive",
            },
          },      
          {
            equipo: {
              nombre: {
                contains: buscar,
                mode: "insensitive",
              },
            },
          },
        ],
      }),
    };

    const total = await this.prisma.jugador.count({
      where,
    });

    const jugadores =
      await this.prisma.jugador.findMany({

        where,

        include: {
          equipo: true,
        },

        skip: (pagina - 1) * limite,

        take: limite,

        orderBy: {
          [sort]: order,
        },
      });

    return {
      data: jugadores.map((jugador) => ({
        ...jugador,
        edad: calcularEdad(
          jugador.fecha_nacimiento
        ),
      })),

      total,

      page: pagina,

      limit: limite,

      totalPages: Math.ceil(total / limite),
    };
  }






  async obtener(id: number) {
    const jugador =
      await this.prisma.jugador.findUnique({
        where: {
          id_jugador: id,
        },
        include: {
          equipo: true,
        },
      });
    if (!jugador) {
      return null;
    }
    return {
      ...jugador,
      edad: calcularEdad(
        jugador.fecha_nacimiento,
      ),
    };
  }




  async actualizar(id: number, dto: any) {
    return this.prisma.jugador.update({
      where: {
        id_jugador: id,
      },
      data: {
        ...dto,
        fecha_nacimiento: new Date(dto.fecha_nacimiento),
        dorsal: Number(dto.dorsal),
        id_equipo: Number(dto.id_equipo),
      },
    });
  }




  async eliminar(id:number){
  return this.prisma.jugador.update({
  where:{
    id_jugador:id
  },
  data:{
    activo:false
  }
  });
  }



  async obtenerResumen() {
    const total = await this.prisma.jugador.count();
    const activos = await this.prisma.jugador.count({
      where: {
        activo: true,
      },
    });
    const inactivos = await this.prisma.jugador.count({
      where: {
        activo: false,
      },
    });
    return {
      total,
      activos,
      inactivos,
    };
  }




  async obtenerInactivos() {
    return this.prisma.jugador.findMany({
      where: {
        activo: false,
      },
      include: {
        equipo: true,
      },
      orderBy: {
        nombres: "asc",
      },
    });
  }



  async restaurar(id: number) {
    return this.prisma.jugador.update({
      where: {
        id_jugador: id,
      },
      data: {
        activo: true,
      },
    });
  }
 

}