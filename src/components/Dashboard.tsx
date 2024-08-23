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
		<div className='container mx-auto px-'>
			<div className='text-center'>
				<Title name='Registro de Ingreso y Salida de Laptops de Estudiantes' />
			</div>
			<div className='text-center my-4'>
				<CurrentDate />
			</div>
			<div className='flex flex-col md:flex-row justify-between items-center'>
				<button className=' md:w-auto py-2 px-4 mt-2 text-white bg-blue-500 hover:bg-blue-700 rounded mb-4 md:mb-8 ml-0 md:ml-5'>
					<a href='/auth/registerdata'>Registrar</a>
				</button>
				<span className='w-full md:w-auto mr-0 md:mr-8 '>
					<SearchDni />
				</span>
			</div>

			<section className='overflow-x-auto rounded-lg'>
				<UserTable
					users={usersToday}
					dni={dni.toString()}
					isAuthenticated={status === 'authenticated'}
					onDeleteUser={handleDeleteUser}
				/>
			</section>
		</div>
	)
}

export default Dashboard
