-- CreateTable
CREATE TABLE "Laptop" (
    "id" SERIAL NOT NULL,
    "marca" TEXT NOT NULL,
    "numeroSerie" TEXT NOT NULL,
    "idUsuario" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Laptop_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Objeto" (
    "id" SERIAL NOT NULL,
    "idUsuario" INTEGER NOT NULL,
    "name" TEXT,
    "descripcion" TEXT,
    "fechaRegistro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Objeto_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Laptop_numeroSerie_key" ON "Laptop"("numeroSerie");

-- AddForeignKey
ALTER TABLE "Laptop" ADD CONSTRAINT "Laptop_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Objeto" ADD CONSTRAINT "Objeto_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
