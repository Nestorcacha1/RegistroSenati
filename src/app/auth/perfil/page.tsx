'use client'
import Lefticon from '@/components/icon/Lefticon'
import UserIcon from '@/components/icon/UserIcon'
import { UserContext } from '@/context/UserContext'

import Link from 'next/link'
import React, { useContext, useEffect } from 'react'

function Perfil() {
	const { user, LoadSuperUser } = useContext(UserContext)
	useEffect(() => {
		LoadSuperUser()
	}, [])
	if (!user) {
		return <h1>Cargando...</h1>
	}
	return (
		<div>
			<div className='mt-4 ml-5 w-10 bg-slate-400 rounded-md '>
				<Link href={'/'}>
					<Lefticon className='w-9' />
				</Link>
			</div>
			<div className='flex justify-center items-center h-screen'>
				<div className='mt-30 flex flex-col items-center bg-blue-200 shadow-lg w-1/2 h-auto p-5 rounded-lg'>
					<h2 className='text-2xl font-bold mb-5'>Mi Perfil</h2>
					{user.map(
						user =>
							user.isAdmin && (
								<section
									key={user.id}
									className='flex flex-col items-start space-y-2 '
								>
									<span className='flex'>
										<UserIcon className='w-20' />
									</span>
									<div className='flex items-center space-x-2'>
										<label className='font-semibold'>Nombre:</label>
										<p className='font-normal'>{user.nombre}</p>
									</div>
									<div className='flex items-center space-x-2'>
										<label className='font-semibold'>Apellido:</label>
										<p className='font-normal'>{user.apellido}</p>
									</div>
									<div className='flex items-center space-x-2'>
										<label className='font-semibold'>Correo:</label>
										<p className='font-normal'>{user.email}</p>
									</div>
									<div className='flex items-center space-x-2'>
										<label className='font-semibold'>Administrador</label>
										<input type='checkbox' checked={true} readOnly />
									</div>
								</section>
							)
					)}
				</div>
			</div>
		</div>
	)
}

export default Perfil
