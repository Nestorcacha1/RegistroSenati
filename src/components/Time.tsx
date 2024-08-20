import React from 'react'

import { format } from 'date-fns'
function Time({ time }: { time: String }) {
	const formatString = 'HH:mm:ss a'
	const formattedTime = time
		? format(new Date(time.toString()), formatString)
		: 'Invalido'

	return (
		<>
			<span className='text-sm'>{formattedTime}</span>
		</>
	)
}

export default Time
