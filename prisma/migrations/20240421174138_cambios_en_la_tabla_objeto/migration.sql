/*
  Warnings:

  - You are about to drop the column `name` on the `Objeto` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Objeto" DROP COLUMN "name",
ADD COLUMN     "nombre" TEXT;
