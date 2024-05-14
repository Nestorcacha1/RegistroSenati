import { NextResponse } from 'next/server'
import prisma from '../../../../libs/db'

interface Params {
	params: { id: String }
}
export async function DELETE(request: Request, { params }: Params) {
	try {
		const DeleteAdmin = await prisma.admin.delete({
			where: {
				id: Number(params.id),
			},
		})
		if (!DeleteAdmin) {
			return NextResponse.json({
				message: 'Admin not found',
			})
		}
		return NextResponse.json(DeleteAdmin)
	} catch (error) {
		NextResponse.json(error)
	}
}
