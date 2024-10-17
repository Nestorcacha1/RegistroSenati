import prisma from '@/libs/db'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
	try {
		const { email, nombre, apellido } = await request.json()
		const user = await prisma.admin.create({
			data: {
				email,
				nombre,
				apellido,
			},
		})
		return NextResponse.json(user)
	} catch (error) {
		return new Response('Error', { status: 400 })
	}
}
