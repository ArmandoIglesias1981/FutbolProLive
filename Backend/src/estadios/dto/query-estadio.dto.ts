import { IsOptional } from "class-validator";

export class QueryEstadioDto {

  @IsOptional()
  buscar?: string;

  @IsOptional()
  page?: string;

  @IsOptional()
  limit?: string;

  @IsOptional()
  sort?: string;

  @IsOptional()
  order?: "asc" | "desc";

}