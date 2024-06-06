import { UserContext } from '@/context/UserContext'
import React, { useContext } from 'react'
import toast from 'react-hot-toast'

interface UserExitProps {
	id: string
}

function UserExit({ id }: UserExitProps) {
	const { ExitUser, LoadUsers } = useContext(UserContext)

	async function handleExitUser(id: string) {
		await ExitUser(id)
		LoadUsers()
		toast.success('Salida de usuario registrada')
	}

	return (
		<>
			<button
				onClick={() => handleExitUser(id)}
				className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-2 rounded'
			>
				Salida
			</button>
		</>
	)
}

export default UserExit
