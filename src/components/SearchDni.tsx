import { useContext, useState } from 'react'
import Button from './Button'
import { UserContext } from '@/context/UserContext'
import toast from 'react-hot-toast'

function SearchDNI() {
	const { SearchDni } = useContext(UserContext)
	const [useDni, setDni] = useState('')
	const [loading, setLoading] = useState(false) // Estado de carga para el spinner

	async function BuscarDni() {
		if (useDni.length !== 8) {
			toast.error('Ingrese un DNI válido de 8 caracteres')
			setDni('')
			return
		}

		setLoading(true) // Inicia la carga

		const data = await SearchDni(useDni)

		setLoading(false) // Finaliza la carga

		if (data) {
			console.log('Usuario encontrado', data)
			toast.success('Usuario encontrado')
			setDni('')
			return
		}

		toast.error('Usuario no encontrado')
		setDni('')
	}

	return (
		<div className='flex justify-center items-center space-x-2'>
			<input
				type='search'
				typeof='number'
				placeholder='Ingrese su DNI'
				value={useDni}
				maxLength={8}
				className='h-10 px-3 py-2 placeholder-gray-500 text-gray-900 rounded-md border border-gray-300 focus:outline-none focus:shadow-outline-gray focus:border-blue-300'
				onChange={e => setDni(e.target.value)}
				disabled={loading} // Deshabilitar el input mientras se busca
			/>
			<Button name={'Buscar'} onClick={BuscarDni} loading={loading}>
				Buscar
			</Button>
		</div>
	)
}

export default SearchDNI
