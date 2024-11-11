import React from 'react'
import Time from '../Time'
import UserExit from '../UserExit'
import EditIcon from '../icon/EditIcon'
import DeletIcon from '../icon/DeletIcon'
import { User } from '@/interface/type'

interface UserRowProps {
	user: User
	dni: string
	isAuthenticated: boolean
	onDelete: (id: string) => void
}

const UserRow: React.FC<UserRowProps> = ({
	user,
	dni,
	isAuthenticated,
	onDelete,
}) => {
	return (
		<tr className={user.dni == dni ? 'bg-slate-400 shadow font-semibold' : ''}>
			<td>{<Time time={user.createdAt} key={user.id} />}</td>
			<td>
				{user && user.id ? <UserExit id={user.id.toString()} /> : 'Sin datos'}
				{user.exit === true ? <Time time={user.exitTime} key={user.id} /> : ''}
			</td>
			<td>{user.nombre}</td>
			<td>{user.apellido}</td>
			<td>{user.dni}</td>
			<td className='text-sm'>{user.carrera}</td>
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
			<td>
				<button className='bg-sky-200 w-8 h-8 rounded-lg p-1'>
					<a href={`/auth/edituser/${user.id}`}>
						<EditIcon />
					</a>
				</button>
			</td>

			{isAuthenticated && (
				<td>
					<button
						className='bg-red-600 w-8 h-8 rounded-lg p-1'
						onClick={() => onDelete(user.id.toString())}
					>
						<DeletIcon />
					</button>
				</td>
			)}
		</tr>
	)
}

export default UserRow
