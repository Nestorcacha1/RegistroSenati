'use client'

import React, { useContext, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import toast from 'react-hot-toast'
import { UserContext } from '@/context/UserContext'
import CurrentDate from './Date'
import SearchDni from './SearchDni'
import Title from './Title'
import UserTable from '@/components/Table/UserTable'

function Dashboard() {
	const { data: session, status } = useSession()
	const { users, LoadUsers, DeleteUser, dni } = useContext(UserContext)

	const currentDate = new Date()
	currentDate.setHours(0, 0, 0, 0)

	const usersToday = Array.isArray(users)
		? users.filter(user => {
				const userCreationDate = new Date(user.createdAt)
				userCreationDate.setHours(0, 0, 0, 0)
				return userCreationDate.getTime() === currentDate.getTime()
		  })
		: []

	useEffect(() => {
		LoadUsers()
	}, [])

	async function handleDeleteUser(id: string) {
		await DeleteUser(id)
		LoadUsers()
		toast.success('Usuario eliminado correctamente')
	}

	return (
		<>
			<div className='text-center'>
				<Title name='Registro de Usuarios' />
			</div>
			<div className='text-center'>
				<CurrentDate />
			</div>
			<div className='flex justify-between'>
				<button className='w-auto py-2 px-4 mt-2 text-white bg-blue-500 hover:bg-blue-700 rounded mb-8 ml-5'>
					<a href='/auth/registerdata'>Registrar</a>
				</button>
				<span className='mr-8'>
					<SearchDni />
				</span>
			</div>

			<section className='space-x-4 flex overflow-x-auto'>
				<UserTable
					users={usersToday}
					dni={dni.toString()}
					isAuthenticated={status === 'authenticated'}
					onDeleteUser={handleDeleteUser}
				/>
			</section>
		</>
	)
}

export default Dashboard
