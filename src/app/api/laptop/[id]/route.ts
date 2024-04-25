import prisma from '@/libs/db'
import { NextResponse } from 'next/server'

interface Params {
	params: { id: string }
}
export async function PUT(request: Request, params: Params) {
	console.log(params.params.id)
	try {
		const { marca, numeroSerie, color } = await request.json()
		const updateLaptop = await prisma.laptop.updateMany({
			where: {
				idUsuario: Number(params.params.id),
			},
			data: {
				marca,
				numeroSerie,
				color,
			},
		})
		return NextResponse.json(updateLaptop)
	} catch (error) {
		return NextResponse.json(error)
	}
}
