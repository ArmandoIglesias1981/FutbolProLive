import { Injectable } from "@nestjs/common";
import {
  Prisma,
  CategoriaArbitro,
} from "@prisma/client";

import { PrismaService } from "../prisma/prisma.service";

import { CreateArbitroDto } from "./dto/create-arbitro.dto";
import { QueryArbitroDto } from "./dto/query-arbitro.dto";

@Injectable()
export class ArbitrosService {

  constructor(
    private prisma: PrismaService,
  ) {}

  async crear(dto: CreateArbitroDto) {

    return this.prisma.arbitro.create({

      data: {

        foto: dto.foto,

        nombres: dto.nombres,

        apellidos: dto.apellidos,

        documento: dto.documento,

        telefono: dto.telefono,

        correo: dto.correo,

        nacionalidad: dto.nacionalidad,

        categoria: dto.categoria as CategoriaArbitro,

        experiencia: dto.experiencia,

      },

    });

  }

  async listar(query: QueryArbitroDto) {

    const {
      buscar = "",
      page = "1",
      limit = "10",
      sort = "id_arbitro",
      order = "asc",
    } = query;

    const pagina = Number(page);
    const limite = Number(limit);

    const where: Prisma.arbitroWhereInput = {

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

          {
            correo: {
              contains: buscar,
              mode: "insensitive",
            },
          },

          {
            telefono: {
              contains: buscar,
              mode: "insensitive",
            },
          },

          {
            nacionalidad: {
              contains: buscar,
              mode: "insensitive",
            },
          },

        ],

      }),

    };

    const total = await this.prisma.arbitro.count({
      where,
    });

    const arbitros = await this.prisma.arbitro.findMany({

      where,

      skip: (pagina - 1) * limite,

      take: limite,

      orderBy: {
        [sort]: order,
      },

    });

    return {

      data: arbitros,

      total,

      page: pagina,

      limit: limite,

      totalPages: Math.ceil(total / limite),

    };

  }

  async obtener(id: number) {
    return this.prisma.arbitro.findUnique({
      where: {
        id_arbitro: id,
      },
    });
  }

  async actualizar(
    id: number,
    dto: CreateArbitroDto,
  ) {

    return this.prisma.arbitro.update({

      where: {
        id_arbitro: id,
      },

      data: {

        foto: dto.foto,

        nombres: dto.nombres,

        apellidos: dto.apellidos,

        documento: dto.documento,

        telefono: dto.telefono,

        correo: dto.correo,

        nacionalidad: dto.nacionalidad,

        categoria: dto.categoria,

        experiencia: dto.experiencia,

      },

    });

  }

  async eliminar(id: number) {

    return this.prisma.arbitro.update({

      where: {
        id_arbitro: id,
      },

      data: {
        activo: false,
      },

    });

  }

  async restaurar(id: number) {

    return this.prisma.arbitro.update({

      where: {
        id_arbitro: id,
      },

      data: {
        activo: true,
      },

    });

  }

  async obtenerResumen() {
    const total = await this.prisma.arbitro.count();
    const activos = await this.prisma.arbitro.count({
      where: {
        activo: true,
      },
    });
    const inactivos = await this.prisma.arbitro.count({
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

    return this.prisma.arbitro.findMany({

      where: {
        activo: false,
      },

      orderBy: {
        nombres: "asc",
      },

    });

  }

}