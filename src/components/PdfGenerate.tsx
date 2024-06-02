import React from 'react'

export default function PdfGenerate({ date }: { date: string }) {
	async function Imprimir() {
		try {
			const divElement = document.getElementById(`table-${date}`)
			if (!divElement) {
				console.error('Div not found')
				return
			}

			const htmlContent = divElement.outerHTML

			const response = await fetch('/api/pdf', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ html: htmlContent }),
			})

			if (response.ok) {
				const pdfBlob = await response.blob()
				const pdfUrl = URL.createObjectURL(pdfBlob)
				window.open(pdfUrl)
			} else {
				console.error('Error al generar el PDF')
			}
		} catch (error) {
			console.error('Error al consumir la API:', error)
		}
	}

	return (
		<>
			<button
				onClick={Imprimir}
				className='bg-green-500 rounded-lg py-2 hover:bg-green-600 text-white font-semibold px-4'
			>
				Imprimir {date}
			</button>
		</>
	)
}
