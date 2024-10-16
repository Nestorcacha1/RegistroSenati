import React from 'react'

interface Props {
	next: string | number | null | undefined
	previous: string | number | null | undefined
	onNext: () => void
	onPrevious: () => void
	isFirstPage: boolean
	isLastPage: boolean
	count: number | undefined
}

const UserFooter = ({
	next,
	count,
	previous,
	onNext,
	onPrevious,
	isFirstPage,
	isLastPage,
}: Props) => {
	return (
		<footer className='flex flex-col md:flex-row justify-between items-center p-4 bg-gray-100 shadow-md rounded-md'>
			<div className='flex flex-row space-x-4'>
				<button
					onClick={onPrevious}
					disabled={isFirstPage}
					className={`py-2 px-4 rounded-md transition-all duration-300 ${
						isFirstPage
							? 'bg-gray-300 text-gray-500 cursor-not-allowed'
							: 'bg-blue-500 hover:bg-blue-700 text-white'
					}`}
				>
					Anterior
				</button>
				<button
					onClick={onNext}
					disabled={isLastPage}
					className={`py-2 px-4 rounded-md transition-all duration-300 ${
						isLastPage
							? 'bg-gray-300 text-gray-500 cursor-not-allowed'
							: 'bg-blue-500 hover:bg-blue-700 text-white'
					}`}
				>
					Siguiente
				</button>
			</div>

			<div className='flex flex-col items-center md:flex-row md:space-x-4 mt-4 md:mt-0'>
				<span className='text-gray-700'>
					Página anterior: <span className='font-medium'>{previous}</span>
				</span>
				<span className='text-gray-700'>
					Página siguiente: <span className='font-medium'>{next}</span>
				</span>
				<span className='font-semibold text-slate-900 bg-white px-3 py-1 shadow-md rounded-md'>
					Total: {count}
				</span>
			</div>
		</footer>
	)
}

export default UserFooter
