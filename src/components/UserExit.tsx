import { UserContext } from '@/context/UserContext'
import { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast'

interface UserExitProps {
	id: string
}

function UserExit({ id }: UserExitProps) {
	const { ExitUser, LoadUsers, users } = useContext(UserContext)
	const [dni, setDni] = useState('')
	const [salidaRealizada, setSalidaRealizada] = useState(false)

	useEffect(() => {
		const user = users.find(user => user.id.toString() === id)
		if (user && user.exit) {
			setSalidaRealizada(true)
		}
	}, [id, users])

	async function handleExitUser(id: string, dni: string) {
		try {
			await ExitUser(id, dni)
			LoadUsers()
			toast.success('Salida de usuario registrada')
			setSalidaRealizada(true)
		} catch (error) {
			toast.error('Error al registrar la salida del usuario')
		}
	}

	if (salidaRealizada) {
		return null // Si la salida fue realizada, el componente se desaparece
	}

	return (
		<div className='flex items-center'>
			<input
				type='text'
				value={dni}
				onChange={e => setDni(e.target.value)}
				placeholder='Últimos 3 dígitos del DNI'
				className='border rounded px-2 py-1 mr-2'
			/>
			<button
				onClick={() => handleExitUser(id, dni)}
				className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-2 rounded'
			>
				Salida
			</button>
		</div>
	)
}

export default UserExit
