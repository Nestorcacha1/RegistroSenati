import React from 'react'

function DownIcon({ className = 'w-6 h-6' }) {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			fill='none'
			viewBox='0 0 24 24'
			strokeWidth={1.5}
			stroke='currentColor'
			className={className}
		>
			<path
				strokeLinecap='round'
				strokeLinejoin='round'
				d='M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3'
			/>
		</svg>
	)
}

export default DownIcon
