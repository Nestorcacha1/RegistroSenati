import React from 'react'
import UserRow from './UserRow'
import TableHeader from '@/components/Table/TableHead'
import { User } from '@/interface/type'
import UserFooter from './UserFooter'

interface UserTableProps {
	users: User[]
	dni: string
	isAuthenticated: boolean
	onDeleteUser: (id: string) => void
}

const UserTable: React.FC<UserTableProps> = ({
	users,
	dni,
	isAuthenticated,
	onDeleteUser,
}) => {
	return (
		<div className='overflow-y-auto max-h-96'>
			<table className='table-auto w-full'>
				<TableHeader isAuthenticated={isAuthenticated} />
				<tbody className=''>
					{users.length > 0 ? (
						users.map(user => (
							<UserRow
								key={user.id}
								user={user}
								dni={dni}
								isAuthenticated={isAuthenticated}
								onDelete={onDeleteUser}
							/>
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
		</div>
	)
}

export default UserTable
