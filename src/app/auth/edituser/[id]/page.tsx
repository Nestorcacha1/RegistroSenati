'use client'
import Input from '@/components/Input'
import React, { useContext, useEffect, useState } from 'react'
import { redirect, useParams } from 'next/navigation'
import Title from '@/components/Title'
import Button from '@/components/Button'
import { UserContext } from '@/context/UserContext'
import { User } from '@/libs/type'

function EditPage() {
	const { id } = useParams<{ id: string }>()
	const [nombre, setNombre] = useState<string>('')
	const [apellido, setApellido] = useState<string>('')
	const [dni, setDni] = useState<string>('')
	const [carrera, setCarrera] = useState<string>('')
	const [color, setColor] = useState<string>('')
	const [marca, setMarca] = useState<string>('')
	const [numeroSerie, setNumeroSerie] = useState<string>('')
	const [objeto, setObjeto] = useState<string>('')
	const [descripcion, setDescripcion] = useState<string>('')
	const [redirectTo, setRedirectTo] = useState(false)

	const { EditLaptop, EditObjeto, EditUser, users } = useContext(UserContext)

	useEffect(() => {
		fetch(`http://localhost:3000/api/user/${id}`)
			.then(response => response.json())
			.then(data => {
				setNombre(data.nombre)
				setApellido(data.apellido)
				setDni(data.dni)
				setCarrera(data.carrera)
				setMarca(data.Laptops[0]?.marca)
				setColor(data.Laptops[0]?.color)
				setNumeroSerie(data.Laptops[0]?.numeroSerie)
				setObjeto(data.Objetos[0]?.nombre)
				setDescripcion(data.Objetos[0]?.descripcion)
			})
	}, [id])

	async function handleUpadateUser() {
		EditUser(
			{
				nombre,
				apellido,
				dni,
				carrera,
			},
			id
		)
		EditLaptop({ marca, color, numeroSerie }, id)
		EditObjeto({ nombre: objeto, descripcion }, id)
		setRedirectTo(true)
	}
	if (redirectTo) {
		return redirect('/')
	}

	return (
		<div className='mt-8 w-full md:w-1/2 mx-auto'>
			<Title name='Actualiza Tus Datos' />
			<div className='mt-8 space-y-4 p-4 border border-gray-300 shadow-lg rounded'>
				<label className='font-semibold text-sm'>Nombre</label>
				<Input
					required={false}
					type='text'
					placeholder='Nombre'
					onChange={e => setNombre(e.target.value)}
					value={nombre}
				/>
				<label className='font-semibold text-sm'>Apellido</label>
				<Input
					required={false}
					type='text'
					placeholder='apellido'
					onChange={e => setApellido(e.target.value)}
					value={apellido}
				/>
				<label className='font-semibold text-sm'>DNI</label>
				<Input
					required={false}
					type='text'
					placeholder='dni'
					onChange={e => setDni(e.target.value)}
					value={dni}
				/>
				<label className='font-semibold text-sm'>Carrera</label>
				<Input
					required={false}
					type='text'
					placeholder='carrera'
					onChange={e => setCarrera(e.target.value)}
					value={carrera}
				/>
				<label className='font-semibold text-sm'>Marca</label>
				<Input
					required={false}
					type='text'
					placeholder='marca'
					onChange={e => setMarca(e.target.value)}
					value={marca}
				/>
				<label className='font-semibold text-sm'>Color</label>
				<Input
					required={false}
					type='text'
					placeholder='color'
					onChange={e => setColor(e.target.value)}
					value={color}
				/>
				<label className='font-semibold text-sm'>Número de Serie</label>
				<Input
					required={false}
					type='text'
					placeholder='numeroSerie'
					onChange={e => setNumeroSerie(e.target.value)}
					value={numeroSerie}
				/>
				<label className='font-semibold text-sm'>Nombre Objeto</label>
				<Input
					required={false}
					type='text'
					placeholder='objeto'
					onChange={e => setObjeto(e.target.value)}
					value={objeto}
				/>
				<label className='font-semibold text-sm'>Descripción</label>
				<Input
					required={false}
					type='text'
					placeholder='descripcion'
					onChange={e => setDescripcion(e.target.value)}
					value={descripcion}
				/>

				<Button name='Actualizar' onClick={handleUpadateUser} />
			</div>
		</div>
	)
}

export default EditPage
