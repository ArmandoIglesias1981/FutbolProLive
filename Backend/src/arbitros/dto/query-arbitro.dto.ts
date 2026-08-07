export class QueryArbitroDto {
  buscar?: string;

  page?: string;

  limit?: string;

  sort?: string;

  order?: "asc" | "desc";
}