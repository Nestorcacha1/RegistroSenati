/*
  Warnings:

  - You are about to drop the column `email` on the `Usuario` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `Usuario` table. All the data in the column will be lost.
  - Added the required column `color` to the `Laptop` table without a default value. This is not possible if the table is not empty.
  - Added the required column `carrera` to the `Usuario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dni` to the `Usuario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idUsuario` to the `Usuario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nceluar` to the `Usuario` table without a default value. This is not possible if the table is not empty.
  - Made the column `apellido` on table `Usuario` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "Usuario_email_key";

-- AlterTable
ALTER TABLE "Laptop" ADD COLUMN     "color" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Usuario" DROP COLUMN "email",
DROP COLUMN "password",
ADD COLUMN     "carrera" TEXT NOT NULL,
ADD COLUMN     "dni" TEXT NOT NULL,
ADD COLUMN     "idUsuario" INTEGER NOT NULL,
ADD COLUMN     "nceluar" TEXT NOT NULL,
ALTER COLUMN "apellido" SET NOT NULL;

-- CreateTable
CREATE TABLE "Admin" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "isAdmin" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");
