'use client'

import PdfGenerate from '@/components/PdfGenerate'
import SearchDni from '@/components/SearchDni'
import UserTableAll from '@/components/Table/UserTableAll'
import Title from '@/components/Title'
import Lefticon from '@/components/icon/Lefticon'
import { UserContext } from '@/context/UserContext'
import { User } from '@/interface/type'
import Link from 'next/link'
import { useContext, useEffect } from 'react'

function AllRegister() {
	const { users, LoadUsersTotal, dni } = useContext(UserContext)
	const currentDate = new Date()
	currentDate.setHours(0, 0, 0, 0)

	function groupByDate(users: any[]) {
		if (!Array.isArray(users)) {
			return {}
		}
		return users.reduce((groups, user) => {
			const dateObject = new Date(user.createdAt)
			const day = dateObject.getDate().toString().padStart(2, '0')
			const month = (dateObject.getMonth() + 1).toString().padStart(2, '0')
			const year = dateObject.getFullYear()
			const date = `${day}/${month}/${year}`

			if (!groups[date]) {
				groups[date] = []
			}
			groups[date].push(user)
			return groups
		}, {})
	}
	const groupedUsers = groupByDate(users)

	useEffect(() => {
		LoadUsersTotal()
	}, [])

	return (
		<>
			<Title name='Historial de Ingreso y Salida de Laptops de Estudiantes' />
			<header className='flex items-center justify-between p-2'>
				<span className='w-10'>
					<Link href='/' aria-label='Atrás'>
						<Lefticon className='w-9' />
					</Link>
				</span>
				<span className='w-full md:w-auto mr-0 md:mr-10'>
					<SearchDni />
				</span>
			</header>

			<main className='p-4'>
				{Object.keys(groupedUsers).length === 0 ? (
					<p className='text-center text-red-500'>
						No hay registros o error en la base de datos
					</p>
				) : (
					Object.entries(groupedUsers).map(([date, users]) => (
						<article key={date} className='mb-8'>
							<div className='flex justify-center mb-4'>
								<PdfGenerate date={date} />
							</div>

							<div
								id={`table-${date}`}
								className='overflow-x-auto rounded-lg border border-gray-300 shadow-lg'
							>
								<UserTableAll
									users={groupedUsers[date] as User[]}
									dni={dni.toString()}
									date={date}
								/>
							</div>
						</article>
					))
				)}
			</main>
		</>
	)
}

export default AllRegister
