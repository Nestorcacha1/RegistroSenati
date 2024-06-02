'use client'
import Button from '@/components/Button'
import Input from '@/components/Input'
import Title from '@/components/Title'
import { UserContext } from '@/context/UserContext'
import { redirect, useParams } from 'next/navigation'
import { useContext, useEffect, useState } from 'react'
import { User } from '@/interface/type'
import toast from 'react-hot-toast'

function EditPage({ user }: { user: User }) {
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
		if (users) {
			toast.success('Usuario actualizado')
		} else {
			toast.error('No se pudo actualizar el usuario')
		}
	}
	if (redirectTo) {
		return redirect('/')
	}

	return (
		<div className='shadow-orange-300 bg-blue-100 rounded-lg p-6 space-y-4 w-1/2 h-auto mx-auto mt-8 '>
			<Title name='Actualiza Tus Datos' />
			<div className='flex flex-col'>
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
					placeholder='Apellido'
					onChange={e => setApellido(e.target.value)}
					value={apellido}
				/>
				<label className='font-semibold text-sm'>DNI</label>
				<Input
					required={false}
					type='text'
					placeholder='DNI'
					onChange={e => setDni(e.target.value)}
					value={dni}
				/>
				<label className='font-semibold text-sm'>Carrera</label>
				<select
					className='border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 mt-2 bg-slate-50 '
					value={carrera}
					onChange={e => setCarrera(e.target.value)}
					required
				>
					<option value=''>Selecciona una carrera</option>
					<option value='Administración Industrial'>
						Administración Industrial
					</option>
					<option value='Seguridad Industrial y Prevención de Riesgos'>
						Seguridad Industrial y Prevención de Riesgos
					</option>
					<option value='Mecánico de Automotores Diesel'>
						Mecánico de Automotores Diesel
					</option>
					<option value='Mecánico de Mantenimiento'>
						Mecánico de Mantenimiento
					</option>
					<option value='Diseño Gráfico Digital'>Diseño Gráfico Digital</option>
					<option value='Mecánico Automotriz'>Mecánico Automotriz</option>
					<option value='Ingenieria de Software con Inteligencia Artificial'>
						Ingenieria de Software con Inteligencia Artificial
					</option>
					<option value='Administración de Empresas'>
						Administración de Empresas
					</option>
					<option value='DE SOPORTE DE TI '>DE SOPORTE DE TI</option>
				</select>
				<label className='font-semibold text-sm'>Marca</label>
				<Input
					required={false}
					type='text'
					placeholder='Marca'
					onChange={e => setMarca(e.target.value)}
					value={marca}
				/>
				<label className='font-semibold text-sm'>Color</label>
				<Input
					required={false}
					type='text'
					placeholder='Color'
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
					placeholder='Objeto'
					onChange={e => setObjeto(e.target.value)}
					value={objeto}
				/>
				<label className='font-semibold text-sm'>Descripción</label>
				<Input
					required={false}
					type='text'
					placeholder='Descripcion del objeto'
					onChange={e => setDescripcion(e.target.value)}
					value={descripcion}
				/>

				<Button name='Actualizar' onClick={handleUpadateUser} />
			</div>
		</div>
	)
}

export default EditPage
