import { NextResponse } from 'next/server'
import prisma from '../../../../libs/db'

interface Params {
	params: { id: string }
}

export async function DELETE(request: Request, { params }: Params) {
	try {
		const id = Number(params.id)
		if (isNaN(id)) {
			return NextResponse.json({ message: 'Invalid ID' }, { status: 400 })
		}

		const deleteAdmin = await prisma.admin.delete({
			where: {
				id: id,
			},
		})

		if (!deleteAdmin) {
			return NextResponse.json({ message: 'Admin not found' }, { status: 404 })
		}

		return NextResponse.json(deleteAdmin)
	} catch (error) {
		return NextResponse.json(
			{ message: 'Internal Server Error', error },
			{ status: 500 }
		)
	}
}
