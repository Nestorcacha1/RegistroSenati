import { NextResponse } from 'next/server'
import prisma from '../../../libs/db'
import zod from 'zod'
import { getPeruvianHours } from '@/libs/time'

export async function GET(request: Request) {
	try {
		const { searchParams } = new URL(request.url)
		const page = parseInt(searchParams.get('page') || '1') // Página actual, por defecto 1
		const limit = 5 // Número de registros por página

		// Cálculo del "skip" (número de registros a saltar)
		const skip = (page - 1) * limit

		let usuarios, totalCount

		const { startUtc, endUtc } = getPeruvianHours()

		if (!startUtc || !endUtc) {
			return NextResponse.json(
				{
					message: 'Error: Invalid time range',
					error: 'Start or end time is undefined',
				},
				{ status: 400 }
			)
		}

		// Convertir las fechas de string a objetos Date correctamente
		const startDate = new Date(startUtc)
		const endDate = new Date(endUtc)

		// Consultar la cantidad total de datos filtrados por horas
		totalCount = await prisma.usuario.count({
			where: {
				createdAt: {
					gte: startDate, // Filtrar desde las 6 AM
					lte: endDate, // Hasta las 10 PM
				},
			},
		})

		// Consultar los datos paginados filtrados por horas
		usuarios = await prisma.usuario.findMany({
			where: {
				createdAt: {
					gte: startDate, // Filtrar desde las 6 AM
					lte: endDate, // Hasta las 10 PM
				},
			},
			include: {
				Laptops: true,
				Objetos: true,
			},
			skip,
			take: limit, // Traer solo 5 resultados por página
		})

		// Modificar el DNI para mostrar solo los primeros 5 dígitos
		// Mostrar solo los primeros 5 dígitos y agregar puntos si el dni tiene más de 5 dígitos
		const usuariosConDniCortado = usuarios.map(usuario => ({
			...usuario,
			dni:
				usuario.dni.length > 5 ? usuario.dni.slice(0, 5) + '...' : usuario.dni,
		}))

		// Generar los enlaces de paginación
		const baseUrl = `${request.url.split('?')[0]}?`
		const nextPage =
			skip + limit < totalCount
				? `${baseUrl}page=${page + 1}&limit=${limit}`
				: null
		const previousPage =
			page > 1 ? `${baseUrl}page=${page - 1}&limit=${limit}` : null

		const totalPages = Math.ceil(totalCount / limit) // Calcular total de paginas
		const nextNumber = page < totalPages ? page + 1 : null // Calcular el numero de la siguiente página
		const previousNumber = page > 1 ? page - 1 : null // Calcular el numero de la página anterior

		return NextResponse.json({
			count: totalCount, // Número total de registros
			next: nextPage, // URL de la siguiente página
			nextNumber: nextNumber, // Número de la página siguiente
			previousNumber: previousNumber, // Número de la página anterior
			previous: previousPage, // URL de la página anterior
			results: usuariosConDniCortado, // Los datos de la página actual
		})
	} catch (error) {
		return NextResponse.json(
			{ message: 'Error fetching data', error },
			{ status: 500 }
		)
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
