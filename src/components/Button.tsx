import React, { ReactNode } from 'react'
import Spinner from './icon/SniperIcon'

interface ButtonProps {
	name: string
	onClick?: () => void
	children?: ReactNode
	loading?: boolean
	href?: string
}
const noop = () => {}

function Button({
	name,
	onClick = noop,
	children,
	loading = false,
	href,
}: ButtonProps) {
	//
	if (href) {
		return (
			<a
				href={href}
				className={`bg-se-secondary font-semibold text-white py-2  p-2 mb-3 px-4 rounded-md mt-4 w-auto hover:bg-se-primary sm:px-6 md:px-8 lg:px-10 xl:px-12 flex items-center justify-center
			${loading ? 'cursor-not-allowed' : ''}`}
			>
				{loading ? <Spinner /> : children || name}
			</a>
		)
	}

	return (
		<button
			className={`bg-se-secondary font-semibold text-white py-2  p-2 mb-3 px-4 rounded-md mt-4 w-auto hover:bg-se-primary sm:px-6 md:px-8 lg:px-10 xl:px-12 flex items-center justify-center
				${loading ? 'cursor-not-allowed' : ''}`}
			onClick={onClick}
			disabled={loading}
		>
			{loading ? <Spinner /> : children || name}
		</button>
	)
}

export default Button
