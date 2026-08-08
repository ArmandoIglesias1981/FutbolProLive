import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

import { PrismaModule } from "./prisma/prisma.module";
import { UploadModule } from "./upload/upload.module";

import { EquiposModule } from "./equipos/equipos.module";
import { JugadoresModule } from "./jugadores/jugadores.module";
import { ArbitrosModule } from "./arbitros/arbitros.module";

import { EstadiosModule } from "./estadios/estadios.module";


@Module({
  imports: [
    UploadModule,
    PrismaModule,
    EquiposModule,
    JugadoresModule,
    ArbitrosModule,
    EstadiosModule,   // ← agregar aquí
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}