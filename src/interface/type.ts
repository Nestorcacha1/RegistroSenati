export interface Laptop {
	id: number
	marca: string
	numeroSerie: string
	color: string
}

export interface Admin {
	email: string
	nombre: string
	apellido: string
	isAdmin: boolean
	createdAt: Date
	updatedAt: Date
}

export interface Objeto {
	id: number
	nombre: string
	descripcion: string
}

export interface User {
	updatedAt: string
	id: number
	idUsuario: string
	nombre: string
	apellido: string
	dni: string
	ncelular: string
	carrera: string
	exit: boolean
	createdAt: string
	Laptops: Laptop[]
	Objetos: Objeto[]
}

export interface UserRegister {
	nombre: string
	apellido: string
	dni: string
	carrera: string
	laptops: { marca: string; color: string; numeroSerie: string }[]
	objetos: { nombre: string; descripcion: string }[]
}

export interface UserUpdate {
	nombre: string
	apellido: string
	dni: string
	carrera: string
}

export interface LaptopUpdate {
	marca: string
	color: string
	numeroSerie: string
}
export interface ObjetoUpdate {
	nombre: string
	descripcion: string
}

export interface TimeEdit {
	updatedAt: string
}

// export interface Admin {
// 	id: number
// 	email: string
// 	password: string
// 	nombre: string
// 	apellido: string
// 	isAdmin: boolean
// }
