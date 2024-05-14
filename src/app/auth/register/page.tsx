'use client'
import Button from '@/components/Button'
import Input from '@/components/Input'
import Image from 'next/image'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

function RegisterPage() {
	const [name, setName] = useState('')
	const [lastName, setLastName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	async function handleRegister() {
		const admin = await fetch('/api/admin', {
			method: 'POST',
			body: JSON.stringify({
				email,
				password,
				nombre: name,
				apellido: lastName,
			}),
			headers: {
				'Content-Type': 'application/json',
			},
		})
		if (!admin.ok) {
			return toast.error('Error al registrar usuario')
		}
		toast.success('Usuario registrado')
	}
	return (
		<div className='flex items-center justify-center h-screen bg-gray-100'>
			<div className='p-10 bg-white rounded shadow-xl'>
				<h1 className='mb-6 text-2xl font-bold text-center'>
					Bienvenidos a la pagina de registro
				</h1>
				<div>
					<label className='block mb-2 text-sm font-bold text-gray-700'>
						Nombre
					</label>
					<Input
						type='text'
						value={name}
						onChange={e => setName(e.target.value)}
						placeholder=''
						required
					/>
					<label className='block mb-2 text-sm font-bold text-gray-700'>
						Apellido
					</label>
					<Input
						type='text'
						value={lastName}
						onChange={e => setLastName(e.target.value)}
						placeholder=''
						required
					/>
					<label className='block mb-2 text-sm font-bold text-gray-700'>
						Password
					</label>
					<Input
						type='text'
						value={password}
						onChange={e => setPassword(e.target.value)}
						placeholder=''
						required
					/>
					<label className='block mb-2 text-sm font-bold text-gray-700'>
						Correo
					</label>
					<Input
						type='email'
						value={email}
						onChange={e => setEmail(e.target.value)}
						placeholder=''
						required
					/>
					<Button name='Registrar' onClick={handleRegister} />
					<div className='mt-4 text-center'>
						<p className='inline-block mr-2 text-gray-700'>
							o iniciar sesión con
						</p>
						<div className='inline-flex items-center'>
							<a
								href='/auth/login'
								className='ml-2 text-blue-500 underline hover:text-blue-700'
							>
								<Image src='/correo.png' width={30} height={30} alt='senati' />
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default RegisterPage
