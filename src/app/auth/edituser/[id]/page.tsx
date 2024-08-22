'use client'
import Button from '@/components/Button'
import Input from '@/components/Input'
import SelectCareer from '@/components/SelectCareer'
import Title from '@/components/Title'
import { UserContext } from '@/context/UserContext'
import { User } from '@/interface/type'
import { redirect, useParams } from 'next/navigation'
import { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast'

function EditPage({ user }: { user: User }) {
	const { id } = useParams<{ id: string }>()
	const [nombre, setNombre] = useState<string>(user?.nombre || '')
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
					maxLength={110}
				/>
				<label className='font-semibold text-sm'>Apellido</label>
				<Input
					required={false}
					type='text'
					placeholder='Apellido'
					onChange={e => setApellido(e.target.value)}
					value={apellido}
					maxLength={110}
				/>
				<label className='font-semibold text-sm'>DNI</label>
				<Input
					required={false}
					type='text'
					placeholder='DNI'
					maxLength={8}
					onChange={e => setDni(e.target.value)}
					value={dni}
				/>
				<label className='font-semibold text-sm'>Carrera</label>
				<SelectCareer carrera={carrera} setCarrera={setCarrera} />
				<label className='font-semibold text-sm'>Marca</label>
				<Input
					required={false}
					type='text'
					placeholder='Marca'
					onChange={e => setMarca(e.target.value)}
					value={marca}
					maxLength={110}
				/>
				<label className='font-semibold text-sm'>Color</label>
				<Input
					required={false}
					type='text'
					placeholder='Color'
					onChange={e => setColor(e.target.value)}
					value={color}
					maxLength={110}
				/>
				<label className='font-semibold text-sm'>Número de Serie</label>
				<Input
					required={false}
					type='text'
					placeholder='numeroSerie'
					onChange={e => setNumeroSerie(e.target.value)}
					value={numeroSerie}
					maxLength={110}
				/>
				<label className='font-semibold text-sm'>Nombre Objeto</label>
				<Input
					required={false}
					type='text'
					placeholder='Objeto'
					onChange={e => setObjeto(e.target.value)}
					value={objeto}
					maxLength={110}
				/>
				<label className='font-semibold text-sm'>Descripción</label>
				<Input
					required={false}
					type='text'
					placeholder='Descripcion del objeto'
					onChange={e => setDescripcion(e.target.value)}
					value={descripcion}
					maxLength={110}
				/>

				<Button name='Actualizar' onClick={handleUpadateUser} />
			</div>
		</div>
	)
}

export default EditPage
