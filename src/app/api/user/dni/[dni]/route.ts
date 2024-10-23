import prisma from '@/libs/db'
import { NextResponse } from 'next/server'

interface Params {
	params: { dni: string }
}

export async function GET(request: Request, { params }: Params) {
	const searchDni = await prisma.usuario.findMany({
		where: {
			dni: params.dni,
		},
		include: {
			Laptops: true,
			Objetos: true,
		},
		orderBy: {
			createdAt: 'desc',
		},
		take: 1,
	})

	if (searchDni.length === 0) {
		return NextResponse.json(
			{ message: 'No se encontró el usuario' },
			{ status: 404 }
		)
	}

	return NextResponse.json(searchDni[0])
}
