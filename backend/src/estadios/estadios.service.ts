import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";

import { PrismaService } from "../prisma/prisma.service";

import { CreateEstadioDto } from "./dto/create-estadio.dto";
import { QueryEstadioDto } from "./dto/query-estadio.dto";

@Injectable()
export class EstadiosService {

  constructor(
    private prisma: PrismaService,
  ) {}

  async crear(dto: CreateEstadioDto) {
    return this.prisma.estadio.create({
      data: {
        nombre: dto.nombre,
        ciudad: dto.ciudad,
        direccion: dto.direccion,
        capacidad: dto.capacidad,
        superficie: dto.superficie,
        fecha_inauguracion: dto.fecha_inauguracion
          ? new Date(dto.fecha_inauguracion)
          : null,
        foto: dto.foto,
        activo: dto.activo ?? true,
      },
    });
  }

  async listar(query: QueryEstadioDto) {

    const {

      buscar = "",

      page = "1",

      limit = "10",

      sort = "id_estadio",

      order = "asc",

    } = query;

    const pagina = Number(page);
    const limite = Number(limit);

    const where: Prisma.estadioWhereInput = {

      activo: true,

      ...(buscar && {

        OR: [

          {

            nombre: {

              contains: buscar,

              mode: "insensitive",

            },

          },

          {

            ciudad: {

              contains: buscar,

              mode: "insensitive",

            },

          },

          {

            direccion: {

              contains: buscar,

              mode: "insensitive",

            },

          },

          {

            superficie: {

              contains: buscar,

              mode: "insensitive",

            },

          },

        ],

      }),

    };

    const total = await this.prisma.estadio.count({
      where,
    });

    const data = await this.prisma.estadio.findMany({

      where,

      skip: (pagina - 1) * limite,

      take: limite,

      orderBy: {

        [sort]: order,

      },

    });

    return {

      data,

      total,

      page: pagina,

      limit: limite,

      totalPages: Math.ceil(total / limite),

    };

  }

  async obtener(id: number) {

    return this.prisma.estadio.findUnique({

      where: {

        id_estadio: id,

      },

    });

  }

  async actualizar(
    id: number,
    dto: CreateEstadioDto,
  ) {

    return this.prisma.estadio.update({

      where: {

        id_estadio: id,

      },

      data: {

        nombre: dto.nombre,

        ciudad: dto.ciudad,

        direccion: dto.direccion,

        capacidad: dto.capacidad,

        superficie: dto.superficie,

        fecha_inauguracion: dto.fecha_inauguracion
          ? new Date(dto.fecha_inauguracion)
          : null,

        foto: dto.foto,

      },

    });

  }

  async eliminar(id: number) {

    return this.prisma.estadio.update({

      where: {

        id_estadio: id,

      },

      data: {

        activo: false,

      },

    });

  }

  async restaurar(id: number) {

    return this.prisma.estadio.update({

      where: {

        id_estadio: id,

      },

      data: {

        activo: true,

      },

    });

  }

  async obtenerInactivos() {

    return this.prisma.estadio.findMany({

      where: {

        activo: false,

      },

      orderBy: {

        nombre: "asc",

      },

    });

  }

  async obtenerResumen() {

    const total = await this.prisma.estadio.count();

    const activos = await this.prisma.estadio.count({

      where: {

        activo: true,

      },

    });

    const inactivos = await this.prisma.estadio.count({

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