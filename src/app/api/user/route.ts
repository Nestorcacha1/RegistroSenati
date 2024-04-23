import { NextResponse } from 'next/server'
import prisma from '../../../libs/db'

export async function GET() {
	try {
		const usuarios = await prisma.usuario.findMany({
			include: {
				Laptops: true,
				Objetos: true,
			},
		})
		return NextResponse.json(usuarios)
	} catch (error) {
		return NextResponse.json(error)
	}
}

export async function POST(request: Request) {
	try {
		const { nombre, apellido, carrera, dni, laptops, objetos } =
			await request.json()
		const newUsuario = await prisma.usuario.create({
			data: {
				nombre,
				apellido,
				carrera,
				dni,

				Laptops: {
					create: laptops,
				},
				Objetos: {
					create: objetos,
				},
			},
			include: {
				Laptops: true,
				Objetos: true,
			},
		})
		return NextResponse.json(newUsuario)
	} catch (error) {
		return NextResponse.json(error)
	}
}
