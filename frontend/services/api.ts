const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://futbolprolive-api.onrender.com";



// =========================
// EQUIPOS
// =========================

// Obtener todos los equipos
export async function obtenerEquipos(
  buscar = "",
  page = 1,
  limit = 10,
  sort = "id_equipo",
  order = "asc"
) {

  const params = new URLSearchParams();

  if (buscar) {
    params.append("buscar", buscar);
  }

  params.append("page", page.toString());
  params.append("limit", limit.toString());
  params.append("sort", sort);
  params.append("order", order);

  const response = await fetch(
    `${API_URL}/equipos?${params.toString()}`,
    {
      cache: "no-store",
    }
  );

  
  if (!response.ok) {
    const texto = await response.text();

    console.error("===== ERROR API EQUIPOS =====");
    console.error("API_URL:", API_URL);
    console.error("URL SOLICITADA:", response.url);
    console.error("STATUS:", response.status);
    console.error("RESPUESTA:", texto);
    console.error("=============================");

    throw new Error(
      `Error equipos: ${response.status}`
    );
  }

  return response.json();

}

// Obtener un equipo por ID
export async function obtenerEquipo(id: number) {
  const response = await fetch(`${API_URL}/equipos/${id}`, {
    cache: "no-store",
  });

  
  if (!response.ok) {
    const texto = await response.text();

    console.error(
      "ERROR JUGADORES:",
      response.status,
      texto
    );

    throw new Error(
      `Error jugadores: ${response.status}`
    );
  }


  return response.json();
}


// Obtener un equipo inactivos
export async function obtenerEquiposInactivos() {

  const response = await fetch(
    `${API_URL}/equipos/inactivos`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Error al cargar equipos inactivos");
  }

  return response.json();
}


// Crear equipo
export async function crearEquipo(data: any) {
  const response = await fetch(`${API_URL}/equipos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Error al crear el equipo");
  }

  return response.json();
}

// Actualizar equipo
export async function actualizarEquipo(
  id: number,
  data: any
) {
  const response = await fetch(
    `${API_URL}/equipos/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    throw new Error("Error al actualizar");
  }

  return response.json();
}


// Eliminar equipo
export async function eliminarEquipo(id: number) {

  const response = await fetch(
    `${API_URL}/equipos/${id}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {

    const error = await response.json();

    throw new Error(error.message);

  }

  return response.json();
}


// Restaurar Equipos
export async function restaurarEquipo(id: number) {

  const response = await fetch(

    `${API_URL}/equipos/${id}/restaurar`,

    {
      method: "PATCH",
    }

  );

  if (!response.ok) {
    throw new Error("Error al restaurar el equipo");
  }

  return response.json();

}

export async function obtenerTodosEquipos() {

  const response = await fetch(
    `${API_URL}/equipos/todos`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Error al obtener todos los equipos");
  }

  return response.json();
}


export async function obtenerResumenEquipos() {
  const res = await fetch(
    `${API_URL}/equipos/resumen`,
    {
      cache: "no-store",
    }
  );
  if (!res.ok) {
    throw new Error(
      "Error al obtener el resumen."
    );
  }
  return res.json();
}










// =========================
// JUGADORES
// =========================

// Obtener todos los jugadores
export async function obtenerJugadores(
  buscar = "",
  page = 1,
  limit = 10,
  sort = "id_jugador",
  order = "asc"
) {

  const params = new URLSearchParams();

  if (buscar) {
    params.append("buscar", buscar);
  }

  params.append("page", page.toString());
  params.append("limit", limit.toString());
  params.append("sort", sort);
  params.append("order", order);

  const response = await fetch(

    `${API_URL}/jugadores?${params.toString()}`,

    {
      cache: "no-store",
    }

  );

  if (!response.ok) {
    throw new Error("Error al cargar jugadores");
  }

  return response.json();
}


// Obtener un jugador
export async function obtenerJugador(id: number) {
  const response = await fetch(`${API_URL}/jugadores/${id}`, {
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error("Error al obtener el jugador");
  }
  return response.json();
}


// Crear jugador
export async function crearJugador(data: any) {
  const response = await fetch(`${API_URL}/jugadores`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Error al crear jugador");
  }
  return response.json();
}



// Actualizar jugador
export async function actualizarJugador(
  id: number,
  data: any
) {
  const response = await fetch(
    `${API_URL}/jugadores/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );
  if (!response.ok) {
    throw new Error("Error al actualizar jugador");
  }
  return response.json();
}



// Eliminar jugador
export async function eliminarJugador(id: number) {
  const response = await fetch(
    `${API_URL}/jugadores/${id}`,
    {
      method: "DELETE",
    }
  );
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }
  return response.json();
}


// Resumen jugadores
export async function obtenerResumenJugadores() {
  const response = await fetch(
    `${API_URL}/jugadores/resumen`,
    {
      cache: "no-store",
    }
  );
  if (!response.ok) {
    throw new Error("Error al obtener el resumen.");
  }
  return response.json();
}



// obtenerJugadoresInactivos
export async function obtenerJugadoresInactivos() {
  const response = await fetch(
    `${API_URL}/jugadores/inactivos`,
    {
      cache: "no-store",
    }
  );
  if (!response.ok) {
    throw new Error(
      "Error al cargar jugadores inactivos"
    );
  }
  return response.json();
}



// Restaurar jugadores
export async function restaurarJugador(id: number) {

  const response = await fetch(
    `${API_URL}/jugadores/${id}/restaurar`,
    {
      method: "PATCH",
    }
  );

  if (!response.ok) {
    throw new Error("Error al restaurar el jugador");
  }

  return response.json();
}




// =========================
// ARBITROS
// =========================

// Obtener varios arbitros
export async function obtenerArbitros(
  buscar = "",
  page = 1,
  limit = 10,
  sort = "id_arbitro",
  order = "asc",
) {
  const res = await fetch(
    `${API_URL}/arbitros?buscar=${buscar}&page=${page}&limit=${limit}&sort=${sort}&order=${order}`,
    {
      cache: "no-store",
    }
  );

  return res.json();
}


// Obtener un arbitro
export async function obtenerArbitro(id: number) {

  const res = await fetch(
    `${API_URL}/arbitros/${id}`,
    {
      cache: "no-store",
    }
  );

  return res.json();

}


// Resumen de Arbitros
export async function obtenerResumenArbitros() {

  const res = await fetch(
    `${API_URL}/arbitros/resumen`,
    {
      cache: "no-store",
    }
  );

  return res.json();

}


// Arbitros Inactivos
export async function obtenerArbitrosInactivos() {

  const res = await fetch(
    `${API_URL}/arbitros/inactivos`,
    {
      cache: "no-store",
    }
  );

  return res.json();

}

// Exportar a Excel
export async function obtenerTodosArbitros() {

  const response = await fetch(
    `${API_URL}/arbitros/todos`
  );

  if (!response.ok) {
    throw new Error("Error al obtener los árbitros");
  }

  return response.json();

}


// Crear arbitro
export async function crearArbitro(data: any) {

  const res = await fetch(`${API_URL}/arbitros`, {

    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(data),

  });

  return res.json();

}


//Actualizar arbitro
export async function actualizarArbitro(
  id: number,
  data: any,
) {

  const res = await fetch(
    `${API_URL}/arbitros/${id}`,
    {

      method: "PUT",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(data),

    }
  );

  return res.json();

}


// Eliminar arbitros
export async function eliminarArbitro(id: number) {

  const response = await fetch(
    `${API_URL}/arbitros/${id}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    throw new Error("Error al eliminar el árbitro");
  }

  return response.json();

}


// Restaurar arbitros
export async function restaurarArbitro(id: number) {

  const res = await fetch(
    `${API_URL}/arbitros/${id}/restaurar`,
    {
      method: "PATCH",
    }
  );

  return res.json();

}




// =========================
// ESTADIOS
// =========================

// Obtener estadios
export async function obtenerEstadios(
  buscar = "",
  page = 1,
  limit = 10,
  sort = "id_estadio",
  order = "asc",
) {

  const res = await fetch(

    `${API_URL}/estadios?buscar=${buscar}&page=${page}&limit=${limit}&sort=${sort}&order=${order}`,

    {
      cache: "no-store",
    }

  );

  return res.json();

}


// Obtener un estadio
export async function obtenerEstadio(id: number) {

  const res = await fetch(

    `${API_URL}/estadios/${id}`,

    {
      cache: "no-store",
    }

  );

  return res.json();

}


// Resumen
export async function obtenerResumenEstadios() {

  const res = await fetch(

    `${API_URL}/estadios/resumen`,

    {
      cache: "no-store",
    }

  );

  return res.json();

}


// Inactivos
export async function obtenerEstadiosInactivos() {

  const res = await fetch(

    `${API_URL}/estadios/inactivos`,

    {
      cache: "no-store",
    }

  );

  return res.json();

}


// Todos
export async function obtenerTodosEstadios() {

  const res = await fetch(

    `${API_URL}/estadios/todos`

  );

  return res.json();

}


// Crear
export async function crearEstadio(data: any) {

  const res = await fetch(

    `${API_URL}/estadios`,

    {

      method: "POST",

      headers: {

        "Content-Type": "application/json",

      },

      body: JSON.stringify(data),

    }

  );

  return res.json();

}


// Actualizar
export async function actualizarEstadio(
  id: number,
  data: any,
) {

  const res = await fetch(

    `${API_URL}/estadios/${id}`,

    {

      method: "PUT",

      headers: {

        "Content-Type": "application/json",

      },

      body: JSON.stringify(data),

    }

  );

  return res.json();

}


// Eliminar
export async function eliminarEstadio(id: number) {

  const res = await fetch(

    `${API_URL}/estadios/${id}`,

    {

      method: "DELETE",

    }

  );

  return res.json();

}


// Restaurar
export async function restaurarEstadio(id: number) {

  const res = await fetch(

    `${API_URL}/estadios/${id}/restaurar`,

    {

      method: "PATCH",

    }

  );

  return res.json();

}

