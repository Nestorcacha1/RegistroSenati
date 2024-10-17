import { NextResponse } from 'next/server'
import prisma from '../../../../libs/db'

export async function GET(request: Request) {
	try {
		// Consultar la cantidad total de datos
		const totalCount = await prisma.usuario.count()

		// Consultar todos los datos sin paginación
		const usuarios = await prisma.usuario.findMany({
			include: {
				Laptops: true,
				Objetos: true,
			},
		})

		return NextResponse.json({
			count: totalCount,
			results: usuarios,
		})
	} catch (error) {
		return NextResponse.json(
			{ message: 'Error: Internal Server Error', error },
			{ status: 500 }
		)
	}
}
