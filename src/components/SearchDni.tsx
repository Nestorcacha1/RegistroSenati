import { useContext, useState } from 'react'
import Button from './Button'
import { UserContext } from '@/context/UserContext'
import { useParams } from 'next/navigation'
import toast from 'react-hot-toast'

function SearchDNI() {
	const { SearchDni } = useContext(UserContext)

	const [useDni, setDni] = useState('')
	async function BuscarDni() {
		const data = await SearchDni(useDni)
		if (data) {
			toast.success('Usuario encontrado')
			setDni('')
			return
		}

		toast.error('Usuario no encontrado')
		setDni('')
	}

	return (
		<>
			<input
				type='search'
				placeholder='Ingrese su DNI'
				value={useDni}
				className='mt-2 px-3 py-2 placeholder-gray-500 text-gray-900 rounded-md border border-gray-300 focus:outline-none focus:shadow-outline-gray focus:border-blue-300'
				onChange={e => setDni(e.target.value)}
			/>
			<Button name='Buscar' onClick={BuscarDni} />
		</>
	)
}

export default SearchDNI
