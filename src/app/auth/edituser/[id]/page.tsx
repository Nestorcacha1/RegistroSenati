'use client'
import Button from '@/components/Button'
import Lefticon from '@/components/icon/Lefticon'
import Input from '@/components/Input'
import SelectCareer from '@/components/SelectCareer'
import Title from '@/components/Title'
import { UserContext } from '@/context/UserContext'
import { User } from '@/interface/type'
import Link from 'next/link'
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
	const [loading, setLoading] = useState(false)

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
		setLoading(true) // Iniciar el estado de carga
		try {
			await EditUser(
				{
					nombre,
					apellido,
					dni,
					carrera,
				},
				id
			)
			await EditLaptop({ marca, color, numeroSerie }, id)
			await EditObjeto({ nombre: objeto, descripcion }, id)
			setRedirectTo(true)
			toast.success('Usuario actualizado')
		} catch (error) {
			toast.error('No se pudo actualizar el usuario')
		} finally {
			setLoading(false)
		}
	}

	if (redirectTo) {
		return redirect('/')
	}

	return (
		<div
			style={{
				backgroundImage: `url('/fondo2.avif')`,
				backgroundSize: 'cover',
				backgroundPosition: 'center',
				backgroundRepeat: 'no-repeat',
				minHeight: '100vh',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				zIndex: 0,
			}}
		>
			<div className='shadow-white z-10 shadow-2xl bg-transparent mb-2 rounded-lg border-4 border-blue-700 p-6 space-y-4 w-full sm:w-3/4 md:w-2/3 lg:w-1/2 h-auto mx-auto mt-2'>
				<span className='w-10'>
					<Link href='/' aria-label='Atrás'>
						<Lefticon className='w-9' />
					</Link>
				</span>
				<Title name='Actualiza Tus Datos' />
				<div className='flex flex-col space-y-1'>
					<label className='font-semibold text-sm text-white'>Nombre</label>
					<Input
						required={false}
						type='text'
						placeholder='Nombre'
						onChange={e => setNombre(e.target.value)}
						value={nombre}
						maxLength={110}
					/>
					<label className='font-semibold text-sm text-white '>Apellido</label>
					<Input
						required={false}
						type='text'
						placeholder='Apellido'
						onChange={e => setApellido(e.target.value)}
						value={apellido}
						maxLength={110}
					/>
					<label className='font-semibold text-sm text-white'>DNI</label>
					<Input
						required={false}
						type='text'
						placeholder='DNI'
						maxLength={8}
						onChange={e => setDni(e.target.value)}
						value={dni}
					/>
					<label className='font-semibold text-sm text-white'>Carrera</label>
					<SelectCareer carrera={carrera} setCarrera={setCarrera} />
					<label className='font-semibold text-sm text-white'>Marca</label>
					<Input
						required={false}
						type='text'
						placeholder='Marca'
						onChange={e => setMarca(e.target.value)}
						value={marca}
						maxLength={110}
					/>
					<label className='font-semibold text-sm text-white'>Color</label>
					<Input
						required={false}
						type='text'
						placeholder='Color'
						onChange={e => setColor(e.target.value)}
						value={color}
						maxLength={110}
					/>
					<label className='font-semibold text-sm text-white'>
						Número de Serie
					</label>
					<Input
						required={false}
						type='text'
						placeholder='numeroSerie'
						onChange={e => setNumeroSerie(e.target.value)}
						value={numeroSerie}
						maxLength={110}
					/>
					<label className='font-semibold text-sm text-white'>
						Nombre Objeto
					</label>
					<Input
						required={false}
						type='text'
						placeholder='Objeto'
						onChange={e => setObjeto(e.target.value)}
						value={objeto}
						maxLength={110}
					/>
					<label className='font-semibold text-sm text-white'>
						Descripción
					</label>
					<Input
						required={false}
						type='text'
						placeholder='Descripcion del objeto'
						onChange={e => setDescripcion(e.target.value)}
						value={descripcion}
						maxLength={110}
					/>

					<Button
						name='Actualizar'
						onClick={handleUpadateUser}
						loading={loading}
					>
						Actualizar
					</Button>
				</div>
			</div>
		</div>
	)
}

export default EditPage
