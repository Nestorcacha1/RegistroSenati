'use client'
import Button from '@/components/Button'
import Input from '@/components/Input'
import Title from '@/components/Title'
import React, { useState } from 'react'

function RegisterData() {
	const [nombre, setNombre] = useState<string>('')
	const [apellido, setApellido] = useState<string>('')
	const [dni, setDni] = useState<string>('')
	const [carrera, setCarrera] = useState<string>('')
	const [marca, setMarca] = useState<string>('')
	const [nserie, setNserie] = useState<string>('')
	const [color, setColor] = useState<string>('')
	const [objeto, setObjeto] = useState<string>('')
	const [descripcion, setDescripcion] = useState<string>('')

	async function handleRegistrar() {
		try {
			const response = await fetch('http://localhost:3000/api/user', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					nombre,
					apellido,
					dni,
					carrera,
					laptops: { marca, numeroSerie: nserie, color },
					objetos: { nombre: objeto, descripcion },
				}),
			})

			if (!response.ok) {
				throw new Error('Error al registrar el usuario')
			}

			const data = await response.json()
			// Haz algo con los datos aquí, por ejemplo:
			console.log(data)
			setNombre('')
			setApellido('')
			setDni('')
			setCarrera('')
			setMarca('')
			setNserie('')
			setColor('')
			setObjeto('')
			setDescripcion('')
		} catch (error) {
			console.error('Error:', error)
		}
	}

	return (
		<div className=' shadow-orange-300 bg-blue-100 rounded-lg p-6 space-y-4 w-1/2 h-auto mx-auto mt-8'>
			<Title name='Registro de Usuarios y Laptop' />
			<div className=''>
				<Input
					type='text'
					value={nombre}
					onChange={e => setNombre(e.target.value)}
					placeholder='Ingrese su nombres'
				/>
				<Input
					type='text'
					value={apellido}
					onChange={e => setApellido(e.target.value)}
					placeholder='Ingrese su Apellidos'
				/>
				<Input
					type='text'
					value={dni}
					onChange={e => setDni(e.target.value)}
					placeholder='Ingrese su DNI'
				/>
				<Input
					type='text'
					value={carrera}
					onChange={e => setCarrera(e.target.value)}
					placeholder='Carrera'
				/>
				<Input
					type='text'
					value={marca}
					onChange={e => setMarca(e.target.value)}
					placeholder='Marca de Laptop'
				/>
				<Input
					type='text'
					value={nserie}
					onChange={e => setNserie(e.target.value)}
					placeholder='Número de serie'
				/>
				<Input
					type='text'
					value={color}
					onChange={e => setColor(e.target.value)}
					placeholder='Color'
				/>
				<Input
					type='text'
					value={objeto}
					onChange={e => setObjeto(e.target.value)}
					placeholder='Objeto'
				/>
				<Input
					type='text'
					value={descripcion}
					onChange={e => setDescripcion(e.target.value)}
					placeholder='descripcion'
				/>

				<Button name='Registrar' onClick={handleRegistrar} />
			</div>
		</div>
	)
}

export default RegisterData
