-- CreateEnum
CREATE TYPE "Posicion" AS ENUM ('PORTERO', 'DEFENSA', 'MEDIOCAMPISTA', 'DELANTERO');

-- CreateEnum
CREATE TYPE "CategoriaArbitro" AS ENUM ('MUNICIPAL', 'DEPARTAMENTAL', 'NACIONAL', 'FIFA');

-- CreateTable
CREATE TABLE "arbitro" (
    "id_arbitro" SERIAL NOT NULL,
    "foto" TEXT,
    "nombres" TEXT NOT NULL,
    "apellidos" TEXT NOT NULL,
    "documento" TEXT NOT NULL,
    "telefono" TEXT,
    "correo" TEXT,
    "nacionalidad" TEXT,
    "categoria" "CategoriaArbitro" NOT NULL,
    "experiencia" INTEGER,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "arbitro_pkey" PRIMARY KEY ("id_arbitro")
);

-- CreateTable
CREATE TABLE "categoria" (
    "id_categoria" SERIAL NOT NULL,
    "nombre" VARCHAR(50) NOT NULL,
    "descripcion" VARCHAR(200),

    CONSTRAINT "categoria_pkey" PRIMARY KEY ("id_categoria")
);

-- CreateTable
CREATE TABLE "equipo" (
    "id_equipo" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "ciudad" TEXT,
    "director_tecnico" TEXT,
    "fecha_registro" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "cel_tecnico" TEXT,
    "correo_tecnico" TEXT,
    "escudo" TEXT,
    "id_tecnico" TEXT,
    "presidente" TEXT,

    CONSTRAINT "equipo_pkey" PRIMARY KEY ("id_equipo")
);

-- CreateTable
CREATE TABLE "estadio" (
    "id_estadio" SERIAL NOT NULL,
    "nombre" VARCHAR(150) NOT NULL,
    "direccion" VARCHAR(200),
    "ciudad" VARCHAR(100),
    "capacidad" INTEGER,

    CONSTRAINT "estadio_pkey" PRIMARY KEY ("id_estadio")
);

-- CreateTable
CREATE TABLE "gol" (
    "id_gol" SERIAL NOT NULL,
    "minuto" INTEGER,
    "id_partido" INTEGER,
    "id_jugador" INTEGER,

    CONSTRAINT "gol_pkey" PRIMARY KEY ("id_gol")
);

-- CreateTable
CREATE TABLE "jugador" (
    "id_jugador" SERIAL NOT NULL,
    "nombres" TEXT NOT NULL,
    "apellidos" TEXT NOT NULL,
    "documento" TEXT NOT NULL,
    "fecha_nacimiento" TIMESTAMP(3) NOT NULL,
    "posicion" "Posicion" NOT NULL,
    "dorsal" INTEGER NOT NULL,
    "nacionalidad" TEXT NOT NULL,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "id_equipo" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "foto" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "jugador_pkey" PRIMARY KEY ("id_jugador")
);

-- CreateTable
CREATE TABLE "partido" (
    "id_partido" SERIAL NOT NULL,
    "fecha" TIMESTAMP(6) NOT NULL,
    "id_torneo" INTEGER,
    "id_estadio" INTEGER,
    "id_arbitro" INTEGER,
    "equipo_local" INTEGER,
    "equipo_visitante" INTEGER,
    "goles_local" INTEGER DEFAULT 0,
    "goles_visitante" INTEGER DEFAULT 0,
    "estado" VARCHAR(20),

    CONSTRAINT "partido_pkey" PRIMARY KEY ("id_partido")
);

-- CreateTable
CREATE TABLE "tabla_posiciones" (
    "id_posicion" SERIAL NOT NULL,
    "id_torneo" INTEGER,
    "id_equipo" INTEGER,
    "partidos_jugados" INTEGER DEFAULT 0,
    "ganados" INTEGER DEFAULT 0,
    "empatados" INTEGER DEFAULT 0,
    "perdidos" INTEGER DEFAULT 0,
    "goles_favor" INTEGER DEFAULT 0,
    "goles_contra" INTEGER DEFAULT 0,
    "diferencia_goles" INTEGER DEFAULT 0,
    "puntos" INTEGER DEFAULT 0,

    CONSTRAINT "tabla_posiciones_pkey" PRIMARY KEY ("id_posicion")
);

-- CreateTable
CREATE TABLE "tarjeta" (
    "id_tarjeta" SERIAL NOT NULL,
    "tipo" VARCHAR(10) NOT NULL,
    "minuto" INTEGER,
    "id_partido" INTEGER,
    "id_jugador" INTEGER,

    CONSTRAINT "tarjeta_pkey" PRIMARY KEY ("id_tarjeta")
);

-- CreateTable
CREATE TABLE "torneo" (
    "id_torneo" SERIAL NOT NULL,
    "nombre" VARCHAR(150) NOT NULL,
    "fecha_inicio" DATE NOT NULL,
    "fecha_fin" DATE,
    "estado" VARCHAR(20),
    "id_categoria" INTEGER,

    CONSTRAINT "torneo_pkey" PRIMARY KEY ("id_torneo")
);

-- CreateTable
CREATE TABLE "usuario" (
    "id_usuario" SERIAL NOT NULL,
    "nombre" VARCHAR(100) NOT NULL,
    "apellido" VARCHAR(100),
    "correo" VARCHAR(150) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "rol" VARCHAR(30) NOT NULL,
    "fecha_creacion" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("id_usuario")
);

-- CreateIndex
CREATE UNIQUE INDEX "arbitro_documento_key" ON "arbitro"("documento");

-- CreateIndex
CREATE UNIQUE INDEX "jugador_documento_key" ON "jugador"("documento");

-- CreateIndex
CREATE UNIQUE INDEX "usuario_correo_key" ON "usuario"("correo");

-- AddForeignKey
ALTER TABLE "gol" ADD CONSTRAINT "fk_gol_jugador" FOREIGN KEY ("id_jugador") REFERENCES "jugador"("id_jugador") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "gol" ADD CONSTRAINT "fk_gol_partido" FOREIGN KEY ("id_partido") REFERENCES "partido"("id_partido") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "jugador" ADD CONSTRAINT "jugador_id_equipo_fkey" FOREIGN KEY ("id_equipo") REFERENCES "equipo"("id_equipo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "partido" ADD CONSTRAINT "fk_local" FOREIGN KEY ("equipo_local") REFERENCES "equipo"("id_equipo") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "partido" ADD CONSTRAINT "fk_partido_arbitro" FOREIGN KEY ("id_arbitro") REFERENCES "arbitro"("id_arbitro") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "partido" ADD CONSTRAINT "fk_partido_estadio" FOREIGN KEY ("id_estadio") REFERENCES "estadio"("id_estadio") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "partido" ADD CONSTRAINT "fk_partido_torneo" FOREIGN KEY ("id_torneo") REFERENCES "torneo"("id_torneo") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "partido" ADD CONSTRAINT "fk_visitante" FOREIGN KEY ("equipo_visitante") REFERENCES "equipo"("id_equipo") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tabla_posiciones" ADD CONSTRAINT "fk_posicion_equipo" FOREIGN KEY ("id_equipo") REFERENCES "equipo"("id_equipo") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tabla_posiciones" ADD CONSTRAINT "fk_posicion_torneo" FOREIGN KEY ("id_torneo") REFERENCES "torneo"("id_torneo") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tarjeta" ADD CONSTRAINT "fk_tarjeta_jugador" FOREIGN KEY ("id_jugador") REFERENCES "jugador"("id_jugador") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tarjeta" ADD CONSTRAINT "fk_tarjeta_partido" FOREIGN KEY ("id_partido") REFERENCES "partido"("id_partido") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "torneo" ADD CONSTRAINT "fk_torneo_categoria" FOREIGN KEY ("id_categoria") REFERENCES "categoria"("id_categoria") ON DELETE NO ACTION ON UPDATE NO ACTION;
