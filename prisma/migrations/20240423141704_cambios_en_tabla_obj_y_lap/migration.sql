-- DropForeignKey
ALTER TABLE "Laptop" DROP CONSTRAINT "Laptop_idUsuario_fkey";

-- DropForeignKey
ALTER TABLE "Objeto" DROP CONSTRAINT "Objeto_idUsuario_fkey";

-- AddForeignKey
ALTER TABLE "Laptop" ADD CONSTRAINT "Laptop_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Objeto" ADD CONSTRAINT "Objeto_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;
