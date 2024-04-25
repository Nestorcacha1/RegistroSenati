export interface Laptop {
	id: number
	marca: string
	numeroSerie: string
	color: string
}

export interface Objeto {
	id: number
	nombre: string
	descripcion: string
}

export interface User {
	updatedAt: string | number | Date
	id: number
	idUsuario: string
	nombre: string
	apellido: string
	dni: string
	ncelular: string
	carrera: string
	createdAt: string
	Laptops: Laptop[]
	Objetos: Objeto[]
}
