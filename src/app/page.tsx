'use client'

import { useEffect, useState } from 'react'
import { User } from '../libs/type'
import React from 'react'

export default function Home() {
	const [users, setUsers] = useState<User[]>([])

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
							<th>Fecha</th>
							<th>Nombre</th>
							<th>Apellido</th>
							<th>DNI</th>
							<th>Carrera</th>
							<th>Marca </th>
							<th>Número de Serie</th>
							<th>Color </th>
							<th>Nombre Objeto</th>
							<th>Descripción </th>
						</tr>
					</thead>
					<tbody>
						{users.map((user: User) => (
							<tr key={user.id}>
								<td>{user.createdAt}</td>
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
							</tr>
						))}
					</tbody>
				</table>
			</section>
		</>
	)
}
