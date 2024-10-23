import { UserContext } from '@/context/UserContext'
import { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import Spinner from './icon/SniperIcon' // Asegúrate de importar el componente Spinner

interface UserExitProps {
	id: string
}

function UserExit({ id }: UserExitProps) {
	const { ExitUser, LoadUsersPaginated, users } = useContext(UserContext)
	const [dni, setDni] = useState('')
	const [salidaRealizada, setSalidaRealizada] = useState(false)
	const [loading, setLoading] = useState(false) // Estado de carga para el spinner

	useEffect(() => {
		const user = users.find(user => user.id.toString() === id)
		if (user && user.exit) {
			setSalidaRealizada(true)
		}
	}, [id, users])

	async function handleExitUser(id: string, dni: string) {
		try {
			if (dni.length === 0) {
				toast.error('Ingrese los últimos 3 dígitos de tu DNI')
				return
			}
			setLoading(true) // Inicia la carga
			await ExitUser(id, dni)
			LoadUsersPaginated(1)
			toast.success('Salida de usuario registrada')
			setSalidaRealizada(true)
		} catch (error) {
			toast.error('Error al registrar la salida del usuario')
		} finally {
			setLoading(false) // Finaliza la carga
		}
	}

	if (salidaRealizada) {
		return null // Si la salida fue realizada, el componente desaparece
	}

	return (
		<div className='flex items-center'>
			<input
				type='text'
				value={dni}
				maxLength={3}
				onChange={e => setDni(e.target.value)}
				placeholder='Últimos 3 dígitos del DNI'
				className='border rounded px-2 py-1 mr-2'
				disabled={loading} // Deshabilitar input mientras carga
			/>
			<button
				onClick={() => handleExitUser(id, dni)}
				className={`bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-2 rounded flex items-center`}
				disabled={loading} // Deshabilitar botón mientras carga
			>
				{loading ? (
					<Spinner /> // Mostrar spinner durante la carga
				) : (
					'Salida'
				)}
			</button>
		</div>
	)
}

export default UserExit
