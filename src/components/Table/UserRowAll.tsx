import { User } from '@/interface/type'
import React from 'react'
import Time from '../Time'

interface userRowAllProps {
	user: User
	dni: string
}

function UserRowAll({ user, dni }: userRowAllProps) {
	return (
		<tr className={user.dni == dni ? 'bg-green-400 font-semibold ' : ''}>
			<td>{<Time time={user.createdAt} key={user.id} />}</td>

			<td>
				<Time time={user.updatedAt} key={user.id} />
			</td>
			<td>{user.nombre}</td>
			<td>{user.apellido}</td>
			<td>{user.dni}</td>
			<td>{user.carrera}</td>
			{user.Laptops &&
				user.Laptops.map((laptop: any) => (
					<React.Fragment key={laptop.id}>
						<td>{laptop.marca || 'Ninguno'}</td>
						<td className='uppercase'>{laptop.numeroSerie || 'Ninguno'}</td>
						<td>{laptop.color || 'Ninguno'}</td>
					</React.Fragment>
				))}
			{user.Objetos &&
				user.Objetos.map((objeto: any) => (
					<React.Fragment key={objeto.id}>
						<td>{objeto.nombre || 'Ninguno'}</td>
						<td>{objeto.descripcion || 'Ninguno'}</td>
					</React.Fragment>
				))}
		</tr>
	)
}

export default UserRowAll
