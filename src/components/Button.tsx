import React, { ReactNode } from 'react'

interface ButtonProps {
	name: string
	onClick?: () => void
	children?: ReactNode
}
const noop = () => {}

function Button({ name, onClick = noop, children }: ButtonProps) {
	return (
		<>
			<button
				className='bg-se-secondary font-semibold text-white py-2 px-4 rounded-md mt-4 w-auto hover:bg-se-primary sm:px-6 md:px-8 lg:px-10 xl:px-12 '
				onClick={onClick}
				name={name}
			>
				{children}
			</button>
		</>
	)
}

export default Button
