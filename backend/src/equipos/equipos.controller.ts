import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { EquiposService } from './equipos.service';
import { CreateEquipoDto } from './dto/create-equipo.dto';
import { UpdateEquipoDto } from './dto/update-equipo.dto';
import { Prisma } from "@prisma/client";

@Controller('equipos')
export class EquiposController {
  constructor(private readonly equiposService: EquiposService) {}

  @Post()
  create(@Body() createEquipoDto: CreateEquipoDto) {
    return this.equiposService.create(createEquipoDto);
  }

  @Get()
  findAll(
    @Query("buscar") buscar?: string,
    @Query("page") page = "1",
    @Query("limit") limit = "10",
    @Query("sort") sort: Prisma.EquipoScalarFieldEnum = "id_equipo",
    @Query("order") order: "asc" | "desc" = "asc",
  ) {
    return this.equiposService.findAll(
      buscar,
      Number(page),
      Number(limit),
      sort,
      order,
    );
  }


  @Get("inactivos")
  findInactivos() {
    return this.equiposService.findInactive();
  }

  @Get("todos")
  findTodos() {
    return this.equiposService.findAllSinFiltro();
  }

  @Get("resumen")
  obtenerResumen() {
    return this.equiposService.obtenerResumen();
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.equiposService.findOne(+id);
  }

  
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEquipoDto: UpdateEquipoDto,
  ) {
    return this.equiposService.update(
      Number(id),
      updateEquipoDto,
    );
  }

  @Patch(":id/restaurar")
  restore(@Param("id") id: string) {
    return this.equiposService.restore(Number(id));
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.equiposService.remove(+id);
  }

  
}


