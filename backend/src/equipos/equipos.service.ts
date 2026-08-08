import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from "@prisma/client";
import { UpdateEquipoDto } from './dto/update-equipo.dto';


@Injectable()
export class EquiposService {

  constructor(private prisma: PrismaService) {}

  // Crear equipo
  async create(data: any) {
    return await this.prisma.equipo.create({
      data: {
        nombre: data.nombre,
        ciudad: data.ciudad,
        director_tecnico: data.director_tecnico,
        id_tecnico: data.id_tecnico,
        cel_tecnico: data.cel_tecnico,
        correo_tecnico: data.correo_tecnico,
        presidente: data.presidente,
        escudo: data.escudo,
    } });
  }

  
  // Listar equipos con búsqueda y paginación
  async findAll(
    buscar?: string,
    page = 1,
    limit = 10,
    sort: Prisma.EquipoScalarFieldEnum = "id_equipo", 
    order: Prisma.SortOrder = "asc",
  ) {

    const where: Prisma.equipoWhereInput = {
      activo: true,

      ...(buscar && {
        OR: [
          {
            nombre: {
              contains: buscar,
              mode: Prisma.QueryMode.insensitive,
            },
          },
          {
            ciudad: {
              contains: buscar,
              mode: Prisma.QueryMode.insensitive,
            },
          },
          {
            director_tecnico: {
              contains: buscar,
              mode: Prisma.QueryMode.insensitive,
            },
          },
          {
            id_tecnico: {
              contains: buscar,
              mode: Prisma.QueryMode.insensitive,
            },
          },
          {
            cel_tecnico: {
              contains: buscar,
              mode: Prisma.QueryMode.insensitive,
            },
          },
          {
            correo_tecnico: {
              contains: buscar,
              mode: Prisma.QueryMode.insensitive,
            },
          },
          {
            presidente: {
              contains: buscar,
              mode: Prisma.QueryMode.insensitive,
            },
          },
          {
            escudo: {
              contains: buscar,
              mode: Prisma.QueryMode.insensitive,
            },
          },
          {
            ...( !isNaN(Number(buscar)) && {
              id_equipo: {
                equals: Number(buscar),
              },
            }),
          },
        ],
      }),
    };

    const total = await this.prisma.equipo.count({
      where,
    });

    console.log({
      buscar,
      page,
      limit,
      sort,
      order,
    });


    const equipos = await this.prisma.equipo.findMany({
      where,
      orderBy: {
        [sort]: order,
      },
      skip: (page - 1) * limit,
      take: limit,
    });
    return {
      data: equipos,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };

  }

  // Equipos inactivos
  async findInactive() {
    return await this.prisma.equipo.findMany({
      where: {
        activo: false,
      },
      orderBy: {
        id_equipo: "asc",
      },
    });
  }
  

  // Buscar un equipo
  async findOne(id: number) {
    const equipo = await this.prisma.equipo.findUnique({
      where: {
        id_equipo: id
      }
    });
    if (!equipo) {
      throw new NotFoundException('Equipo no encontrado');
    }
    return equipo;
  }


  // Actualizar
  async update(id: number, data: UpdateEquipoDto) {
    return await this.prisma.equipo.update({
      where: {
        id_equipo: id,
      },
      data: {
        nombre: data.nombre,
        ciudad: data.ciudad,
        director_tecnico: data.director_tecnico,
        id_tecnico: data.id_tecnico,
        cel_tecnico: data.cel_tecnico,
        correo_tecnico: data.correo_tecnico,
        presidente: data.presidente,
        escudo: data.escudo,
        activo: data.activo,
      },
    });
  }

  // Desactivar equipo (Soft Delete)
  async remove(id: number) {
    try {
      return await this.prisma.equipo.update({
        where: {
          id_equipo: id,
        },
        data: {
          activo: false,
        },
      });
    } catch (error) {
      console.error(error);
      throw new BadRequestException(
        "No fue posible desactivar el equipo."
      );
    }
  }


  // Restaurar equipo
  async restore(id: number) {
    return await this.prisma.equipo.update({
     where: {
       id_equipo: id,
      },
      data: {
        activo: true,
      },
    });
  }


  async findAllSinFiltro() {
    return await this.prisma.equipo.findMany({
      orderBy: {
        id_equipo: "asc",
      },
    });
  }


  // Resumen estadisticas
  async obtenerResumen() {
    const total = await this.prisma.equipo.count();
    const activos = await this.prisma.equipo.count({
      where: {
        activo: true,
      },
    });
    const inactivos = await this.prisma.equipo.count({
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


}