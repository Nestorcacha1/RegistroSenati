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
		if (user) {
			setFound(false)
		} else {
			setFound(true)
		}
	}
	return (
		<>
			<input
				type='search'
				placeholder='Ingrese su DNI'
				value={dni}
				className={`border-2 p-2 rounded-md mt-8 ${
					found ? 'bg-purple-500' : 'border-sky-600'
				}`}
				onChange={e => setDni(e.target.value)}
			/>
			<Button name='Buscar' onClick={BuscarDni} />
		</>
	)
}

export default SearchDNI
