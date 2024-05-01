import prisma from '@/libs/db'
import { NextResponse } from 'next/server'

interface Params {
	params: { dni: string }
}
export async function GET(request: Request, { params }: Params) {
	try {
		const searchDni = await prisma.usuario.findFirst({
			where: {
				dni: params.dni,
			},
			include: {
				Laptops: true,
				Objetos: true,
			},
		})
		if (!searchDni) {
			return NextResponse.json({ message: 'No existe el usuario hola' })
		}
		return NextResponse.json(searchDni)
	} catch (error) {
		return NextResponse.json(error)
	}
}
