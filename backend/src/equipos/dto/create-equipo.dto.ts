import {
  IsBoolean,
  IsOptional,
  IsString,
} from "class-validator";

export class CreateEquipoDto {

  @IsString()
  nombre: string;

  @IsOptional()
  @IsString()
  ciudad?: string;

  @IsOptional()
  @IsString()
  director_tecnico?: string;

  @IsOptional()
  @IsString()
  id_tecnico?: string;

  @IsOptional()
  @IsString()
  cel_tecnico?: string;

  @IsOptional()
  @IsString()
  correo_tecnico?: string;

  @IsOptional()
  @IsString()
  presidente?: string;

  @IsOptional()
  @IsString()
  escudo?: string;

  @IsOptional()
  @IsBoolean()
  activo?: boolean;

}