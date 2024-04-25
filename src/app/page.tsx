'use client'

import { format } from 'date-fns'
import { useEffect, useState } from 'react'
import { User } from '../libs/type'
import React from 'react'
import EditIcon from '@/components/icon/EditIcon'
import DeletIcon from '@/components/icon/DeletIcon'
import { useParams } from 'react-router-dom'

const peruTimeZone = 'America/Lima'
const formatString = 'HH:mm:ss'

export default function Home() {
	const [users, setUsers] = useState<User[]>([])
	const { id } = useParams<{ id: string }>()
	useEffect(() => {
		fetch('http://localhost:3000/api/user')
			.then(response => response.json())
			.then(data => setUsers(data))
	}, [])

	function fechaActual() {
		let fecha = new Date()
		let dia = fecha.getDate()
		let mes = (fecha.getMonth() + 1).toString().padStart(2, '0')
		let año = fecha.getFullYear()
		return `${dia}/${mes}/${año}`
	}

	async function handleDeleteUser(id: string) {
		try {
			const response = await fetch(`http://localhost:3000/api/user/${id}`, {
				method: 'DELETE',
			})

			if (!response.ok) {
				throw new Error('Error al eliminar el usuario')
			}
		} catch (error) {
			console.log('Error', error)
		}
	}

	return (
		<>
			<h1>Home</h1>

			<div className='text-center'>Registro de Usuarios</div>
			<div className='text-center'>
				Fecha
				<span className='ml-16'>{fechaActual()}</span>
			</div>
			<section className='space-x-4 flex overflow-x-auto'>
				<table className='table-auto w-full'>
					<thead>
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
						{users.map(user => (
							<tr key={user.id}>
								<td>
									{format(
										new Date(
											new Date(user.createdAt).toLocaleString('en-US', {
												timeZone: peruTimeZone,
											})
										),
										formatString
									)}
								</td>
								<td>
									{format(
										new Date(
											new Date(user.updatedAt).toLocaleString('en-US', {
												timeZone: peruTimeZone,
											})
										),
										formatString
									)}
								</td>
								<td>{user.nombre}</td>
								<td>{user.apellido}</td>
								<td>{user.dni}</td>
								<td>{user.carrera}</td>
								{user.Laptops.map((laptop, index) => (
									<React.Fragment key={index}>
										<td>{laptop.marca}</td>
										<td>{laptop.numeroSerie}</td>
										<td>{laptop.color}</td>
									</React.Fragment>
								))}
								{user.Objetos.map((objeto, index) => (
									<React.Fragment key={index}>
										<td>{objeto.nombre}</td>
										<td>{objeto.descripcion}</td>
									</React.Fragment>
								))}
								<td>
									<a href={`/auth/edituser/${user.id}`}>
										<EditIcon />
									</a>
								</td>
								<td>
									<button onClick={() => handleDeleteUser(user.id.toString())}>
										<DeletIcon />
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</section>
		</>
	)
}
