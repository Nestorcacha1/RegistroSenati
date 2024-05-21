import { UserContext } from '@/context/UserContext'
import React, { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { format } from 'date-fns'
import DeletIcon from './icon/DeletIcon'
import EditIcon from './icon/EditIcon'
import Time from './Time'
import SearchDni from './SearchDni'

function Dashboard() {
	const { users, LoadUsers, DeleteUser, dni } = useContext(UserContext)

	useEffect(() => {
		LoadUsers()
	}, [])

	function fechaActual() {
		let fecha = new Date()
		let dia = fecha.getDate()
		let mes = (fecha.getMonth() + 1).toString().padStart(2, '0')
		let año = fecha.getFullYear()
		return `${dia}/${mes}/${año}`
	}

	async function handleDeleteUser(id: string) {
		await DeleteUser(id)
		LoadUsers()
		toast.success('Usuario eliminado correctamente')
	}

	return (
		<>
			<div className='text-center'>Registro de Usuarios</div>
			<div className='text-center'>
				Fecha
				<span className='ml-16'>{fechaActual()}</span>
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
						{users.length > 0 ? (
							users.map(user => (
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
			</section>
		</>
	)
}

export default Dashboard
