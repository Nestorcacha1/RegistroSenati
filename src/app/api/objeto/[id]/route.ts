import prisma from '@/libs/db'
import { NextResponse } from 'next/server'

interface Params {
	params: { id: string }
}
export async function PUT(request: Request, params: Params) {
	try {
		const { nombre, descripcion } = await request.json()
		const updateObjeto = await prisma.objeto.updateMany({
			where: {
				idUsuario: Number(params.params.id),
			},
			data: {
				nombre,
				descripcion,
			},
		})
		return NextResponse.json(updateObjeto)
	} catch (error) {
		NextResponse.json(error)
	}
}
