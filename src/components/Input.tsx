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
				type={type}
				value={value}
				onChange={onChange}
				placeholder={placeholder}
				required={required}
				maxLength={maxLength}
				className='w-full mt-2 px-3 py-2 placeholder-gray-500 text-gray-900 rounded-md border border-gray-300 focus:outline-none focus:shadow-outline-gray focus:border-blue-300 sm:py-3 sm:px-1 md:py-3 md:px-3 lg:py-3 lg:px-6'
			/>
		</>
	)
}

export default Input
