import React, { useState } from 'react'
import PdfIcon from './icon/PdfIcon'
import Spinner from './icon/SniperIcon' // Asegúrate de tener un componente Spinner

export default function PdfGenerate({ date }: { date: string }) {
	const [loading, setLoading] = useState(false) // Estado para manejar la carga

	async function Imprimir() {
		setLoading(true) // Inicia el estado de carga
		try {
			const divElement = document.getElementById(`table-${date}`)
			if (!divElement) {
				console.error('Div not found')
				setLoading(false) // Finaliza la carga si ocurre un error
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

				// Crear un enlace temporal
				const link = document.createElement('a')
				link.href = pdfUrl
				link.download = `Reporte_${date}.pdf` // Nombre del archivo para descargar
				document.body.appendChild(link)
				link.click() // Simular el click en el enlace
				document.body.removeChild(link) // Eliminar el enlace una vez descargado
				URL.revokeObjectURL(pdfUrl) // Liberar el objeto URL
			} else {
				console.error('Error al generar el PDF')
			}
		} catch (error) {
			console.error('Error al consumir la API:', error)
		} finally {
			setLoading(false) // Finaliza el estado de carga
		}
	}

	return (
		<div className='flex justify-center w-auto'>
			<button
				onClick={Imprimir}
				className={`bg-green-500 rounded-lg py-2 hover:bg-green-600 text-white font-semibold px-4 flex items-center space-x-2 ${
					loading ? 'cursor-not-allowed opacity-50' : ''
				}`}
				disabled={loading} // Deshabilitar el botón mientras está en estado de carga
			>
				{loading ? <Spinner /> : <PdfIcon />}
				<span>{loading ? 'Generando...' : `Imprimir ${date}`}</span>
			</button>
		</div>
	)
}
