import { NextResponse } from 'next/server'
import prisma from '../../../../libs/db'
interface Params {
	params: { id: String }
}
interface Paramss {
	params: { dni: string }
}

export async function GET(request: Request, { params }: Params) {
	try {
		const firtsUser = await prisma.usuario.findFirst({
			where: {
				id: Number(params.id),
			},
			include: {
				Laptops: true,
				Objetos: true,
			},
		})
		if (!firtsUser) {
			return NextResponse.json({ message: 'No existe el usuario' })
		}
		return NextResponse.json(firtsUser)
	} catch (error) {
		return NextResponse.json(error)
	}
}

export async function PUT(request: Request, { params }: Params) {
	try {
		const { nombre, apellido, carrera, dni, updatedAt } = await request.json()
		const UpdateUser = await prisma.usuario.update({
			where: {
				id: Number(params.id),
			},
			data: {
				nombre,
				apellido,
				carrera,
				dni,
				updatedAt,
			},
		})
		return NextResponse.json(UpdateUser)
	} catch (error) {
		return NextResponse.json(error)
	}
}

export async function DELETE(request: Request, { params }: Params) {
	try {
		const DeleteUser = await prisma.usuario.delete({
			where: {
				id: Number(params.id),
			},
		})
		if (!DeleteUser) {
			return NextResponse.json({
				message: 'User not found',
			})
		}
		return NextResponse.json(DeleteUser)
	} catch (error) {
		return NextResponse.json(error)
	}
}
