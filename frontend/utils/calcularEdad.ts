export function calcularEdad(fechaNacimiento: string): string {

  if (!fechaNacimiento) return "";

  const nacimiento = new Date(fechaNacimiento);
  const hoy = new Date();

  let años = hoy.getFullYear() - nacimiento.getFullYear();
  let meses = hoy.getMonth() - nacimiento.getMonth();
  let dias = hoy.getDate() - nacimiento.getDate();

  if (dias < 0) {
    meses--;

    const ultimoMes = new Date(
      hoy.getFullYear(),
      hoy.getMonth(),
      0
    );

    dias += ultimoMes.getDate();
  }

  if (meses < 0) {
    años--;
    meses += 12;
  }

  return `${años} años, ${meses} meses y ${dias} días`;

}