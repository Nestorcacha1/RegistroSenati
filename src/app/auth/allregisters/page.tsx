'use client'

import SearchDni from '@/components/SearchDni'
import Time from '@/components/Time'
import DeletIcon from '@/components/icon/DeletIcon'
import EditIcon from '@/components/icon/EditIcon'
import Lefticon from '@/components/icon/Lefticon'
import { UserContext } from '@/context/UserContext'
import { User } from '@/interface/type'
import Link from 'next/link'
import React, { useContext, useEffect } from 'react'
import toast from 'react-hot-toast'

function AllRegister() {
	const { users, LoadUsers, DeleteUser, dni } = useContext(UserContext)
	const currentDate = new Date()
	currentDate.setHours(0, 0, 0, 0)

	function groupByDate(users: any[]) {
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

	async function handleDeleteUser(id: string) {
		await DeleteUser(id)
		LoadUsers()
		toast.success('Usuario eliminado correctamente')
	}

	const handleGenerarPDF = () => {
		const htmlContent = document.getElementById('myDiv')?.outerHTML

		fetch('/api/pdf', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ html: htmlContent }),
		})
			.then(response => response.blob())
			.then(blob => {
				const url = window.URL.createObjectURL(new Blob([blob]))
				const link = document.createElement('a')
				link.href = url
				link.setAttribute('download', 'output.pdf')
				document.body.appendChild(link)
				link.click()
				link.parentNode?.removeChild(link)
			})
			.catch(error => console.error('Error al generar el PDF:', error))
	}

	return (
		<>
			<div className='text-center mt-10 mb-10 font-semibold'>
				Registro De Todos Los Usuarios Registrados Por Fecha
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
			{Object.entries(groupedUsers).map(([date, users]) => (
				<section key={date} className='space-x-4 flex overflow-x-auto'>
					<div id='myDiv'>
						<table className='table-auto w-full mt-8'>
							<thead>
								<tr className='bg-sky-300'>
									<th colSpan={13} className='text-center'>
										{date}
										<button onClick={handleGenerarPDF}>imp</button>
									</th>
								</tr>
								<tr className='bg-sky-300'>
									<th>Hora Ent.</th>
									<th>Hora Sali.</th>
									<th>Nombre</th>
									<th>Apellido</th>
									<th>DNI</th>
									<th>Carrera</th>
									<th>Marca </th>
									<th>Número de Serie</th>
									<th>Color </th>
									<th>Nombre Objeto</th>
									<th>Descripción </th>
									<th>Editar</th>
									<th>Eliminar</th>
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
											<td>
												<button className='bg-sky-200 w-8 h-8 rounded-lg p-1'>
													<a href={`/auth/edituser/${user.id}`}>
														<EditIcon />
													</a>
												</button>
											</td>
											<td>
												<button
													className='bg-red-600 w-8 h-8 rounded-lg p-1'
													onClick={() => handleDeleteUser(user.id.toString())}
												>
													<DeletIcon />
												</button>
											</td>
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
			))}
		</>
	)
}

export default AllRegister
