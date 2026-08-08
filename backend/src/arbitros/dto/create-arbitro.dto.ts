import {
  IsEmail,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
} from "class-validator";

import { CategoriaArbitro } from "@prisma/client";

export class CreateArbitroDto {

  @IsOptional()
  @IsString()
  foto?: string;

  @IsString()
  nombres: string;

  @IsString()
  apellidos: string;

  @IsString()
  documento: string;

  @IsOptional()
  @IsString()
  telefono?: string;

  @IsOptional()
  @IsEmail()
  correo?: string;

  @IsOptional()
  @IsString()
  nacionalidad?: string;

  @IsEnum(CategoriaArbitro)
  categoria: CategoriaArbitro;

  @IsOptional()
  @IsInt()
  experiencia?: number;

}