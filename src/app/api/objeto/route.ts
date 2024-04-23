import prisma from '@/libs/db'
import { NextResponse } from 'next/server'

// export async function GET() {
// 	try {
// 		const objetos = await prisma.objeto.findMany()
// 		return NextResponse.json(objetos)
// 	} catch (error) {
// 		return NextResponse.json(error)
// 	}
// }

export async function POST(request: Request) {
	try {
		const { nombre, descripcion, idUsuario } = await request.json()
		const objetos = await prisma.objeto.create({
			data: {
				nombre,
				descripcion,
				idUsuario: Number(idUsuario),
			},
		})
		return NextResponse.json(objetos)
	} catch (error) {
		return NextResponse.json(error)
	}
}
