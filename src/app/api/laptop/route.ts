import prisma from '@/libs/db'
import { request } from 'http'
import { NextResponse } from 'next/server'

interface Params {
	params: { id: string }
}

export async function GET() {
	try {
		const laptops = await prisma.laptop.findMany()
		return NextResponse.json(laptops)
	} catch (error) {
		return NextResponse.json(error)
	}
}

export async function POST(request: Request) {
	try {
		const { marca, idUsuario, numeroSerie, color } = await request.json()
		const newLaptops = await prisma.laptop.create({
			data: {
				idUsuario: Number(idUsuario),
				marca,
				numeroSerie,
				color,
				date: new Date(),
			},
		})
		return NextResponse.json(newLaptops)
	} catch (error) {
		return NextResponse.json(error)
	}
}
