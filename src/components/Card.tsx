import React from 'react'

function CardUser() {
	return (
		<div className='bg-white shadow-md rounded-lg p-6 max-w-md mx-auto mt-10'>
			<section>
				<span className='text-green-600 font-bold text-lg'>Salida Exitosa</span>
				<p className='text-gray-700 mt-2'>Gracias por marcar tu salida</p>
				<p className='text-gray-500 mt-1'>Hora: 12:00:01</p>
				<div className='mt-4'>
					<h3 className='text-gray-800 font-semibold text-xl'>Datos</h3>
					<p className='text-gray-700 mt-2'>Nombre: Juan</p>
					<p className='text-gray-700 mt-1'>Apellido: Perez</p>
					<p className='text-gray-700 mt-1'>DNI: 12345678</p>
					<p className='text-gray-700 mt-1'>Carrera: Ingenieria de Sistemas</p>
				</div>
			</section>
		</div>
	)
}

export default CardUser
