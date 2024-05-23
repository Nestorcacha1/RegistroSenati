import { NextApiRequest, NextApiResponse } from 'next'
import puppeteer from 'puppeteer'

export async function POST(req: NextApiRequest, res: NextApiResponse) {
	// Manejar solicitud POST
	const { html } = req.body

	try {
		// Lanzar una nueva instancia del navegador
		const browser = await puppeteer.launch()
		const page = await browser.newPage()

		// Establecer el contenido HTML en la página
		await page.setContent(html, { waitUntil: 'domcontentloaded' })

		// Generar el PDF
		const pdf = await page.pdf({ format: 'A4' })

		// Cerrar el navegador
		await browser.close()

		// Enviar el PDF como respuesta
		res.setHeader('Content-Type', 'application/pdf')
		res.setHeader('Content-Disposition', 'attachment; filename=output.pdf')
		res.status(200).send(pdf)
	} catch (error) {
		console.error('Error al generar el PDF:', error)
		res.status(500).json({ error: 'Error al generar el PDF' })
	}
}
