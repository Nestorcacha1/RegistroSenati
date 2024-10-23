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
		<footer className='flex justify-between items-center flex-nowrap p-2 bg-slate-300 shadow-md border border-blue-700'>
			<div className='flex flex-row space-x-1'>
				<button
					onClick={onPrevious}
					disabled={isFirstPage}
					className={`py-1 px-2 rounded-md transition-all duration-300 text-xs ${
						isFirstPage
							? 'bg-gray-300 text-gray-500 cursor-not-allowed'
							: 'bg-se-secondary hover:bg-se-primary hover:-translate-x-1 text-white'
					}`}
				>
					Anterior
				</button>
				<button
					onClick={onNext}
					disabled={isLastPage}
					className={`py-1 px-2 rounded-md transition-all duration-300 text-xs ${
						isLastPage
							? 'bg-gray-300 text-gray-500 cursor-not-allowed'
							: 'bg-se-secondary hover:bg-se-primary hover:translate-x-2 text-white'
					}`}
				>
					Siguiente
				</button>
			</div>

			<div className='flex flex-row space-x-1 text-xs'>
				<span className='text-gray-700 shadow rounded text-center'>
					Anterior: <span className='font-medium'>{previous}</span>
				</span>
				<span className='text-gray-700 shadow rounded text-center'>
					Siguiente: <span className='font-medium'>{next}</span>
				</span>
				<span className='font-semibold text-slate-900 bg-white px-2 py-1 shadow-md rounded-md'>
					Total: {count}
				</span>
			</div>
		</footer>
	)
}

export default UserFooter
