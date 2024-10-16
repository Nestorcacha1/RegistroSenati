import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function Notfound() {
	return (
		<div className='flex flex-col justify-center items-center h-screen bg-gradient-to-r from-blue-500 to-purple-600'>
			{/* Imagen de error */}
			<Image
				src='/404.png'
				alt='404'
				width={300}
				height={300}
				className='rounded-xl shadow-lg hover:scale-105 transition-transform duration-300 animate-pulse'
			/>

			{/* Mensaje de error */}
			<h1 className='text-5xl font-bold text-white mt-8'>
				404 | Página no encontrada
			</h1>

			{/* Botón para volver a la página principal */}
			<Link
				href='/'
				className='mt-6 inline-block bg-white text-blue-500 font-semibold py-3 px-6 rounded-full shadow-lg hover:bg-blue-100 transition-colors duration-300'
			>
				Ir a la página principal
			</Link>
		</div>
	)
}
