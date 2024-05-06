import { useContext, useState } from 'react'
import Button from './Button'
import { UserContext } from '@/context/UserContext'
import { useParams } from 'next/navigation'

function SearchDNI() {
	const { SearchDni } = useContext(UserContext)

	const [dni, setDni] = useState('')
	const [found, setFound] = useState(false)
	async function BuscarDni() {
		SearchDni(dni)
		const user = await SearchDni(dni)
		console.log(user)
		if (user) {
			setFound(false)
		} else {
			setFound(true)
		}
		setDni('')
	}
	return (
		<>
			<input
				type='search'
				placeholder='Ingrese su DNI'
				value={dni}
				className='mt-2 px-3 py-2 placeholder-gray-500 text-gray-900 rounded-md border border-gray-300 focus:outline-none focus:shadow-outline-gray focus:border-blue-300'
				onChange={e => setDni(e.target.value)}
			/>
			<Button name='Buscar' onClick={BuscarDni} />
		</>
	)
}

export default SearchDNI
