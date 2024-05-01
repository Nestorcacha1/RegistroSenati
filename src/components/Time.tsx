import React from 'react'

import { format } from 'date-fns'
function Time({ time }: { time: String }) {
	const formatString = 'HH:mm:ss'
	const formattedTime = time
		? format(new Date(time.toString()), formatString)
		: 'Invalido'

	return (
		<>
			<span>{formattedTime}</span>
		</>
	)
}

export default Time
