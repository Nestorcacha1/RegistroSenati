import prisma from '@/libs/db'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
	try {
		const { email, password, nombre, apellido } = await request.json()
		const user = await prisma.admin.create({
			data: {
				email,
				password,
				nombre,
				apellido,
			},
		})
		return NextResponse.json(user)
	} catch (error) {
		return new Response('Error', { status: 400 })
	}
}

export async function GET() {
	try {
		const users = await prisma.admin.findMany()
		return NextResponse.json(users)
	} catch (error) {
		return new Response('Error', { status: 400 })
	}
}
