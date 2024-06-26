import React from 'react'

interface InputsProps {
	type: string
	value: string
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
	placeholder: string
	required: boolean
}

function Input({
	type,
	value,
	onChange,
	placeholder,
	required = true,
}: InputsProps) {
	return (
		<>
			<input
				type={type}
				value={value}
				onChange={onChange}
				placeholder={placeholder}
				required={required}
				className='w-full mt-2 px-3 py-2 placeholder-gray-500 text-gray-900 rounded-md border border-gray-300 focus:outline-none focus:shadow-outline-gray focus:border-blue-300'
			/>
		</>
	)
}

export default Input
