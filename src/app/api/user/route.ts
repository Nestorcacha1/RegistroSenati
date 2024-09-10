import { NextResponse } from 'next/server'
import prisma from '../../../libs/db'
import zod from 'zod'
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
	const schema = zod.object({
		nombre: zod.string(),
		apellido: zod.string(),
		carrera: zod.string(),
		dni: zod.string().min(8),
		laptops: zod.array(
			zod.object({
				marca: zod.string(),
				numeroSerie: zod.string(),
				color: zod.string(),
			})
		),
		objetos: zod.array(
			zod.object({
				nombre: zod.string(),
				descripcion: zod.string(),
			})
		),
	})
	const cleanData = schema.strip().parse(await request.json())
	try {
		const user = await prisma.usuario.create({
			data: {
				nombre: cleanData.nombre,
				apellido: cleanData.apellido,
				carrera: cleanData.carrera,
				dni: cleanData.dni,
				Laptops: {
					create: cleanData.laptops,
				},
				Objetos: {
					create: cleanData.objetos,
				},
			},
		})
		return NextResponse.json(user, { status: 201 })
	} catch (error) {
		return NextResponse.json(error, { status: 401 })
	}
}
