import { NextResponse } from 'next/server'
import prisma from '../../../../libs/db'

export async function GET(request: Request) {
	try {
		const { searchParams } = new URL(request.url)
		const page = parseInt(searchParams.get('page') || '1') // Página actual, por defecto 1
		const limit = 5 // Número de registros por página

		// Cálculo del "skip" (número de registros a saltar)
		const skip = (page - 1) * limit

		let usuarios, totalCount

		// Consultar la cantidad total de datos
		totalCount = await prisma.usuario.count()

		// Consultar los datos paginados
		usuarios = await prisma.usuario.findMany({
			include: {
				Laptops: true,
				Objetos: true,
			},
			skip,
			take: limit, // Traer solo 5 resultados por página
		})

		// Generar los enlaces de paginación
		const baseUrl = `${request.url.split('?')[0]}?`
		const nextPage =
			usuarios.length === limit ? `${baseUrl}page=${page + 1}` : null
		const previousPage = page > 1 ? `${baseUrl}page=${page - 1}` : null
		const previousNumber = page > 1 ? page - 1 : null
		const nextNumber = usuarios.length === limit ? page + 1 : null

		return NextResponse.json({
			count: totalCount,
			next: nextPage,
			previous: previousPage,
			previousNumber,
			nextNumber,
			results: usuarios,
		})
	} catch (error) {
		return NextResponse.json(
			{ message: 'Error: Internal Server Error', error },
			{ status: 500 }
		)
	}
}
