import React from 'react'

interface TitleProps {
	name: string
}

export default function Title({ name }: TitleProps) {
	return (
		<>
			<h2 className='text-center font-bold mt-8 py-2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl primary-dark'>
				{name}
			</h2>
		</>
	)
}
