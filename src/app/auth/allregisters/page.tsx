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
	const { users, LoadUsers, dni } = useContext(UserContext)
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
		LoadUsers()
	}, [])

	return (
		<>
			<Title name='Historial de Ingreso y Salida de Laptops de Estudiantes' />
			<div>
				<div className='mt-4 ml-5 w-10 bg-slate-400 rounded-md '>
					<Link href={'/'} title='Atras'>
						<Lefticon className='w-9' />
					</Link>
				</div>
				<div>
					<span>
						<SearchDni />
					</span>
				</div>
			</div>
			{Object.keys(groupedUsers).length === 0 ? (
				<span className='text-center text-red-500'>
					No hay registros o error en la base de datos
				</span>
			) : (
				Object.entries(groupedUsers).map(([date, users]) => (
					<section key={date} className=''>
						<div className='flex items-center justify-center mt-5'>
							<PdfGenerate date={date} />
						</div>

						<div
							id={`table-${date}`}
							className='space-x-4 flex overflow-x-auto'
						>
							<UserTableAll
								users={groupedUsers[date] as User[]}
								dni={dni.toString()}
								date={date}
							/>
						</div>
					</section>
				))
			)}
		</>
	)
}

export default AllRegister
