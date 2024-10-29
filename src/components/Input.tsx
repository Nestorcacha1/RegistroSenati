import React from 'react'

interface InputsProps {
	type: string
	value: string
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
	placeholder: string
	required: boolean
	maxLength: number
}

function Input({
	type,
	value,
	onChange,
	placeholder,
	required = true,
	maxLength,
}: InputsProps) {
	return (
		<>
			<input
				style={{ backgroundColor: 'rgb(195, 220, 246)' }}
				type={type}
				value={value}
				onChange={onChange}
				placeholder={placeholder}
				required={required}
				maxLength={maxLength}
				className='w-full mt-2 px-4 py-3 placeholder-gray-500 text-gray-900 bg-cyan-100 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 
					focus:border-blue-400 transition duration-300 ease-in-out shadow-sm focus:shadow-md sm:py-3 sm:px-3 md:py-3 md:px-4 lg:py-3 lg:px-5'
			/>
		</>
	)
}

export default Input
