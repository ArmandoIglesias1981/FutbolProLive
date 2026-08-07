export function calcularEdad(
  fechaNacimiento: Date,
): string {

  const hoy = new Date();

  let años =
    hoy.getFullYear() -
    fechaNacimiento.getFullYear();

  let meses =
    hoy.getMonth() -
    fechaNacimiento.getMonth();

  let dias =
    hoy.getDate() -
    fechaNacimiento.getDate();

  if (dias < 0) {

    meses--;

    const ultimoMes = new Date(
      hoy.getFullYear(),
      hoy.getMonth(),
      0,
    );

    dias += ultimoMes.getDate();
  }

  if (meses < 0) {
    años--;
    meses += 12;
  }

  return `${años} años, ${meses} meses y ${dias} días`;

}