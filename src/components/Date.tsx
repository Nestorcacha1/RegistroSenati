import React from 'react'

function CurrentDate() {
	function fechaActual() {
		let fecha = new Date()
		let dia = fecha.getDate()
		let mes = (fecha.getMonth() + 1).toString().padStart(2, '0')
		let año = fecha.getFullYear()
		return `${dia}/${mes}/${año}`
	}
	return (
		<>
			<span className='bg-slate-200 py-2 font-semibold rounded-lg'>
				Fecha: {fechaActual()}
			</span>
		</>
	)
}

export default CurrentDate
