import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from "@nestjs/common";

import { EstadiosService } from "./estadios.service";
import { CreateEstadioDto } from "./dto/create-estadio.dto";
import { QueryEstadioDto } from "./dto/query-estadio.dto";

@Controller("estadios")
export class EstadiosController {

  constructor(
    private readonly service: EstadiosService,
  ) {}

  @Post()
  crear(
    @Body() dto: CreateEstadioDto,
  ) {
    return this.service.crear(dto);
  }

  @Get()
  listar(
    @Query() query: QueryEstadioDto,
  ) {
    return this.service.listar(query);
  }

  @Get("resumen")
  resumen() {
    return this.service.obtenerResumen();
  }

  @Get("inactivos")
  inactivos() {
    return this.service.obtenerInactivos();
  }

  @Get(":id")
  obtener(
    @Param("id") id: string,
  ) {
    return this.service.obtener(Number(id));
  }

  @Put(":id")
  actualizar(
    @Param("id") id: string,
    @Body() dto: CreateEstadioDto,
  ) {
    return this.service.actualizar(
      Number(id),
      dto,
    );
  }

  @Delete(":id")
  eliminar(
    @Param("id") id: string,
  ) {
    return this.service.eliminar(Number(id));
  }

  @Patch(":id/restaurar")
  restaurar(
    @Param("id") id: string,
  ) {
    return this.service.restaurar(Number(id));
  }

}