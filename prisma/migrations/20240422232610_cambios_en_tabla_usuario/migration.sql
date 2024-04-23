/*
  Warnings:

  - You are about to drop the column `date` on the `Laptop` table. All the data in the column will be lost.
  - You are about to drop the column `fechaRegistro` on the `Objeto` table. All the data in the column will be lost.
  - You are about to drop the column `ncelular` on the `Usuario` table. All the data in the column will be lost.
  - Made the column `descripcion` on table `Objeto` required. This step will fail if there are existing NULL values in that column.
  - Made the column `nombre` on table `Objeto` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Laptop" DROP COLUMN "date";

-- AlterTable
ALTER TABLE "Objeto" DROP COLUMN "fechaRegistro",
ALTER COLUMN "descripcion" SET NOT NULL,
ALTER COLUMN "nombre" SET NOT NULL;

-- AlterTable
ALTER TABLE "Usuario" DROP COLUMN "ncelular";
