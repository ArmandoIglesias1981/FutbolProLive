import {
  IsBoolean,
  IsDateString,
  IsInt,
  IsOptional,
  IsString,
  Min,
} from "class-validator";

export class CreateEstadioDto {

  @IsString()
  nombre: string;

  @IsOptional()
  @IsString()
  ciudad?: string;

  @IsOptional()
  @IsString()
  direccion?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  capacidad?: number;

  @IsOptional()
  @IsString()
  superficie?: string;

  @IsOptional()     
  @IsDateString()
  fecha_inauguracion?: string;

  @IsOptional()
  @IsString()
  foto?: string;

  @IsOptional()
  @IsBoolean()
  activo?: boolean;

}