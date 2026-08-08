import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Max,
  Min,
} from "class-validator";

import { Posicion } from "@prisma/client";


export class CreateJugadorDto {

  @IsString()
  nombres:string;


  @IsString()
  apellidos:string;


  @IsString()
  documento:string;


  @IsDateString()
  fecha_nacimiento:string;


  @IsEnum(Posicion)
  posicion:Posicion;


  @IsInt()
  @Min(1)
  @Max(99)
  dorsal:number;


  @IsString()
  nacionalidad:string;


  @IsInt()
  id_equipo:number;


  @IsOptional()
  @IsString()
  foto?:string;


  @IsOptional()
  @IsBoolean()
  activo?:boolean;

}