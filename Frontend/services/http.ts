const API = process.env.NEXT_PUBLIC_API_URL;

export async function get<T>(url: string): Promise<T> {

  const respuesta = await fetch(`${API}${url}`, {
    cache: "no-store",
  });

  if (!respuesta.ok) {
    throw new Error("Error al consultar la API");
  }

  return respuesta.json();

}

export async function post<T>(
  url: string,
  body: unknown,
): Promise<T> {

  const respuesta = await fetch(`${API}${url}`, {

    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(body),

  });

  if (!respuesta.ok) {
    throw new Error("Error al guardar");
  }

  return respuesta.json();

}

export async function patch<T>(
  url: string,
  body: unknown,
): Promise<T> {

  const respuesta = await fetch(`${API}${url}`, {

    method: "PATCH",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(body),

  });

  if (!respuesta.ok) {
    throw new Error("Error al actualizar");
  }

  return respuesta.json();

}

export async function del<T>(
  url: string,
): Promise<T> {

  const respuesta = await fetch(`${API}${url}`, {

    method: "DELETE",

  });

  if (!respuesta.ok) {
    throw new Error("Error al eliminar");
  }

  return respuesta.json();

}