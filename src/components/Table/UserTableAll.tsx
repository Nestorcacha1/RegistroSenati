import { User } from '@/interface/type'
import React from 'react'
import TableHeadAll from './TableHeadAll'
import UserRowAll from './UserRowAll'

interface UserTableProps {
	users: User[]
	dni: string
	date: string
}

const UserTableAll: React.FC<UserTableProps> = ({ users, dni, date }) => {
	return (
		<table className='table-auto w-full mt-1'>
			<TableHeadAll />

			<tbody>
				{users.length > 0 ? (
					users.map(user => (
						<UserRowAll dni={dni.toString()} user={user} key={user.id} />
					))
				) : (
					<tr>
						<td colSpan={13} className='text-center text-red-500'>
							No hay registros o error en la base de datos
						</td>
					</tr>
				)}
			</tbody>
		</table>
	)
}

export default UserTableAll
