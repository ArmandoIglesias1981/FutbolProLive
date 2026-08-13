const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://futbolprolive-api.onrender.com";

export async function subirImagen(file: File): Promise<string> {
  const formData = new FormData();

  formData.append("file", file);

  const response = await fetch(`${API_URL}/upload`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Error al subir la imagen.");
  }

  const data = await response.json();

  return data.url;
}