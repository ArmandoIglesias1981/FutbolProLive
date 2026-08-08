import { Module } from "@nestjs/common";

import { EstadiosController } from "./estadios.controller";
import { EstadiosService } from "./estadios.service";
import { PrismaModule } from "../prisma/prisma.module";

@Module({

  imports: [
    PrismaModule,
  ],

  controllers: [
    EstadiosController,
  ],

  providers: [
    EstadiosService,
  ],

})

export class EstadiosModule {}