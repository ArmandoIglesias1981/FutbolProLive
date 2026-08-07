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

import { ArbitrosService } from "./arbitros.service";
import { CreateArbitroDto } from "./dto/create-arbitro.dto";
import { QueryArbitroDto } from "./dto/query-arbitro.dto";

@Controller("arbitros")
export class ArbitrosController {

  constructor(
    private readonly service: ArbitrosService,
  ) {}

  @Post()
  crear(
    @Body() dto: CreateArbitroDto,
  ) {
    return this.service.crear(dto);
  }

  @Get()
  listar(
    @Query() query: QueryArbitroDto,
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
    @Body() dto: CreateArbitroDto,
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