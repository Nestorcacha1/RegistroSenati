/*
  Warnings:

  - You are about to drop the column `password` on the `Admin` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Admin" DROP COLUMN "password";

-- AlterTable
ALTER TABLE "Usuario" ADD COLUMN     "exitTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
