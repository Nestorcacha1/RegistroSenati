import React from 'react'

interface TitleProps {
	name: string
}

export default function Title({ name }: TitleProps) {
	return (
		<>
			<h1 className='primary-dark text-center text-4xl font-bold mt-8 py-2'>
				{name}
			</h1>
		</>
	)
}
