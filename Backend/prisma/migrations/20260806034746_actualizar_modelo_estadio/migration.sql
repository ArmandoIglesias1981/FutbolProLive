/*
  Warnings:

  - Added the required column `updatedAt` to the `estadio` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "estadio" ADD COLUMN     "activo" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "fecha_inauguracion" TIMESTAMP(3),
ADD COLUMN     "foto" TEXT,
ADD COLUMN     "superficie" VARCHAR(50),
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
