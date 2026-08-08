import { Module } from "@nestjs/common";
import { PrismaModule } from "../prisma/prisma.module";

import { ArbitrosController } from "./arbitros.controller";
import { ArbitrosService } from "./arbitros.service";

@Module({
  imports: [PrismaModule],
  controllers: [ArbitrosController],
  providers: [ArbitrosService],
})
export class ArbitrosModule {}