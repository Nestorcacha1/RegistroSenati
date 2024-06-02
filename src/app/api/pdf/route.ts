import { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import puppeteer from 'puppeteer'

export async function POST(req: NextRequest) {
	// Manejar solicitud POST
	const { html } = await req.json()

	try {
		// Lanzar una nueva instancia del navegador
		const browser = await puppeteer.launch()
		const page = await browser.newPage()

		// Establecer el contenido HTML en la página
		await page.setContent(html, { waitUntil: 'domcontentloaded' })

		// Generar el PDF
		const pdfBuffer = await page.pdf({ format: 'A4' })

		// Cerrar el navegador
		await browser.close()

		// Enviar el PDF como respuesta
		const pdfResponse = new NextResponse(pdfBuffer, {
			headers: {
				'Content-Type': 'application/pdf',
				'Content-Disposition': 'attachment; filename=output.pdf',
			},
		})

		return pdfResponse
	} catch (error) {
		console.error('Error al generar el PDF:', error)
		return NextResponse.json(
			{ error: 'Error al generar el PDF' },
			{ status: 500 }
		)
	}
}
