import React from 'react'

interface ButtonProps {
	name: string
	onClick: () => void
}

function Button({ name, onClick }: ButtonProps) {
	return (
		<>
			<button
				className='bg-blue-400 font-semibold text-white py-2 px-4 rounded-md mt-4 w-auto hover:bg-blue-500 sm:px-6 md:px-8 lg:px-10 xl:px-12 '
				onClick={onClick}
			>
				{name}
			</button>
		</>
	)
}

export default Button
