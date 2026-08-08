import { Module } from '@nestjs/common';
import { JugadoresController } from './jugadores.controller';
import { JugadoresService } from './jugadores.service';
import { PrismaService } from '../prisma/prisma.service';


@Module({

controllers:[
 JugadoresController
],

providers:[
 JugadoresService,
 PrismaService
]

})
export class JugadoresModule {}