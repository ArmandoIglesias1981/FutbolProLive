import { IsOptional, IsString, IsNumberString } from "class-validator";

export class QueryJugadorDto {
  @IsOptional()
  @IsString()
  buscar?: string;

  @IsOptional()
  @IsNumberString()
  page?: string;

  @IsOptional()
  @IsNumberString()
  limit?: string;

  @IsOptional()
  @IsString()
  sort?: string;

  @IsOptional()
  @IsString()
  order?: "asc" | "desc";
}