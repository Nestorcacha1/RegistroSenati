import React from 'react'

interface ButtonProps {
	name: string
	onClick: () => void
}

function Button({ name, onClick }: ButtonProps) {
	return (
		<>
			<button
				className='bg-blue-400 font-semibold text-white p-2 rounded-md mt-4  hover:bg-blue-500 w-auto'
				onClick={onClick}
			>
				{name}
			</button>
		</>
	)
}

export default Button
