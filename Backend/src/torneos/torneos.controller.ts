import { Controller, Get } from '@nestjs/common';

@Controller('torneos')
export class TorneosController {

  @Get()
  obtenerTorneos() {
    return [
      {
        id: 1,
        nombre: 'Liga Municipal'
      },
      {
        id: 2,
        nombre: 'Copa Barranquilla'
      }
    ];
  }

}