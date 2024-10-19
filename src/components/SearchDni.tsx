import { useContext, useState } from 'react'
import Button from './Button'
import { UserContext } from '@/context/UserContext'
import { useParams } from 'next/navigation'
import toast from 'react-hot-toast'
import SearchIcon from './icon/SearchIcon'

function SearchDNI() {
	const { SearchDni } = useContext(UserContext)

	const [useDni, setDni] = useState('')
	async function BuscarDni() {
		if (useDni.length !== 8) {
			toast.error('Ingrese un DNI válido de 8 caracteres')
			setDni('')
			return
		}
		const data = await SearchDni(useDni)

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
		<>
			<input
				type='search'
				typeof='number'
				placeholder='Ingrese su DNI'
				value={useDni}
				maxLength={8}
				className='mt-2 px-3 py-2 placeholder-gray-500 text-gray-900 rounded-md border border-gray-300 focus:outline-none focus:shadow-outline-gray focus:border-blue-300 mr-3 mb-5 ml-5 '
				onChange={e => setDni(e.target.value)}
			/>
			{/* <SearchIcon className='w-6 h-6' /> */}
			<Button name={'Buscar'} onClick={BuscarDni}>
				Buscar
			</Button>
		</>
	)
}

export default SearchDNI
