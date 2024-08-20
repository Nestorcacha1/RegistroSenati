'use client'

import PdfGenerate from '@/components/PdfGenerate'
import SearchDni from '@/components/SearchDni'
import Time from '@/components/Time'
import Lefticon from '@/components/icon/Lefticon'
import { UserContext } from '@/context/UserContext'
import { User } from '@/interface/type'
import Link from 'next/link'
import React, { useContext, useEffect } from 'react'

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
			<div className='text-center mt-10 mb-10 font-semibold text-3xl uppercase'>
				Registro de todo los alumnos | SENATI
			</div>
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

						<div id={`table-${date}`}>
							<table className='table-auto w-full mt-1'>
								<thead>
									<tr className='bg-sky-300'>
										<th colSpan={11} className='text-center'>
											{date}
										</th>
									</tr>
									<tr className='bg-sky-300'>
										<th>Hora Ent.</th>
										<th>Hora Sali.</th>
										<th>Nombre</th>
										<th>Apellido</th>
										<th>DNI</th>
										<th>Carrera</th>
										<th>Marca</th>
										<th>Número de Serie</th>
										<th>Color</th>
										<th>Nombre Objeto</th>
										<th>Descripción</th>
									</tr>
								</thead>

								<tbody>
									{(users as User[]).length > 0 ? (
										(users as User[]).map(user => (
											<tr
												key={user.id}
												className={
													user.dni == dni ? 'bg-green-400 font-semibold ' : ''
												}
											>
												<td>{<Time time={user.createdAt} key={user.id} />}</td>
												<td>{<Time time={user.updatedAt} key={user.id} />}</td>
												<td>{user.nombre}</td>
												<td>{user.apellido}</td>
												<td>{user.dni}</td>
												<td>{user.carrera}</td>
												{user.Laptops &&
													user.Laptops.map(laptop => (
														<React.Fragment key={laptop.id}>
															<td>{laptop.marca || 'Ninguno'}</td>
															<td>{laptop.numeroSerie || 'Ninguno'}</td>
															<td>{laptop.color || 'Ninguno'}</td>
														</React.Fragment>
													))}
												{user.Objetos &&
													user.Objetos.map(objeto => (
														<React.Fragment key={objeto.id}>
															<td>{objeto.nombre || 'Ninguno'}</td>
															<td>{objeto.descripcion || 'Ninguno'}</td>
														</React.Fragment>
													))}
											</tr>
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
					</section>
				))
			)}
		</>
	)
}

export default AllRegister
