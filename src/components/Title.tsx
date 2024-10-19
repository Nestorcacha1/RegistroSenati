import React from 'react'

interface TitleProps {
	name: string
}

export default function Title({ name }: TitleProps) {
	return (
		<>
			<h2
				className='shadow rounded bg-slate-100 text-center font-semibold mt-0 py-2 text-xs sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl'
				style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }} // Cambia los valores según la intensidad del contorno
			>
				{name}
			</h2>
		</>
	)
}
