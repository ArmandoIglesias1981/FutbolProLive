import {
 Controller,
 Get,
 Post,
 Put,
 Delete,
 Body,
 Param,
 Patch,
 Query,
} from '@nestjs/common';

import { JugadoresService } from './jugadores.service';
import { CreateJugadorDto } from './dto/create-jugador.dto';
import { QueryJugadorDto } from "./dto/query-jugador.dto";



@Controller('jugadores')
export class JugadoresController {


constructor(
 private service:JugadoresService
){}



@Get()
listar(
  @Query() query: QueryJugadorDto,
) {
  return this.service.listar(query);
}



@Get("resumen")
obtenerResumen() {
  return this.service.obtenerResumen();
}


@Get("inactivos")
obtenerInactivos() {
  return this.service.obtenerInactivos();
}


@Get(':id')
obtener(
 @Param('id') id:string
){

 return this.service.obtener(Number(id));

}



@Post()
crear(
 @Body() dto:CreateJugadorDto
){

 return this.service.crear(dto);

}



@Put(':id')
actualizar(
 @Param('id') id:string,
 @Body() dto:any
){

 return this.service.actualizar(
 Number(id),
 dto
 );

}


@Patch(":id/restaurar")
restaurar(
  @Param("id") id: string,
) {
  return this.service.restaurar(Number(id));
}


@Delete(':id')
eliminar(
 @Param('id') id:string
){

 return this.service.eliminar(Number(id));

}


}