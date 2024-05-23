function handleGeneratePdf() {
	const htmlContent = document.getElementById('myDiv')?.outerHTML

	if (htmlContent) {
		fetch('/api/generatePdf', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ html: htmlContent }),
		})
			.then(response => response.blob())
			.then(blob => {
				const url = window.URL.createObjectURL(new Blob([blob]))
				const link = document.createElement('a')
				link.href = url
				link.setAttribute('download', 'output.pdf')
				document.body.appendChild(link)
				link.click()
				link.parentNode?.removeChild(link)
			})
			.catch(error => console.error('Error al generar el PDF:', error))
	} else {
		console.error('No se encontró el elemento con el ID "myDiv"')
	}
}
