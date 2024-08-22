'use client'
import Button from '@/components/Button'
import Input from '@/components/Input'
import SelectCareer from '@/components/SelectCareer'
import Title from '@/components/Title'
import { UserContext } from '@/context/UserContext'
import { redirect } from 'next/navigation'
import { useContext, useState } from 'react'
import toast from 'react-hot-toast'

function RegisterData() {
	const [nombre, setNombre] = useState<string>('')
	const [apellido, setApellido] = useState<string>('')
	const [dni, setDni] = useState<string>('')
	const [carrera, setCarrera] = useState<string>('')
	const [marca, setMarca] = useState<string>('')
	const [color, setColor] = useState<string>('')
	const [numeroSerie, setNumeroSerie] = useState<string>('')
	const [objeto, setObjeto] = useState<string>('')
	const [descripcion, setDescripcion] = useState<string>('')
	const [redirecTo, setRedirectTo] = useState(false)
	const { AddUsers } = useContext(UserContext)

	function limpiarCampos() {
		setNombre('')
		setApellido('')
		setDni('')
		setCarrera('')
		setMarca('')
		setColor('')
		setNumeroSerie('')
		setObjeto('')
		setDescripcion('')
	}

	async function handleRegistrar() {
		if (
			!nombre ||
			!apellido ||
			!dni ||
			!carrera ||
			!marca ||
			!color ||
			!numeroSerie
		) {
			toast.error('Complete todos los campos')
		} else {
			try {
				await AddUsers({
					nombre,
					apellido,
					dni,
					carrera,
					laptops: [{ marca, numeroSerie, color }],
					objetos: [{ nombre: objeto, descripcion }],
				})
				setRedirectTo(true)

				limpiarCampos()
				toast.success('Registro exitoso')
			} catch (error) {
				toast.error('Error al registrar')
				toast.loading('Cargando...')
			}
		}
	}

	if (redirecTo) {
		redirect('/')
	}

	return (
		<div className=' shadow-orange-300 bg-blue-100 rounded-lg p-6 space-y-4 w-1/2 h-auto mx-auto mt-8'>
			<Title name='Registro de Usuarios y Laptop' />
			<div className='flex flex-col'>
				<Input
					required
					type='text'
					value={nombre}
					onChange={e => setNombre(e.target.value)}
					placeholder='Ingrese su nombres'
					maxLength={110}
				/>
				<Input
					required={true}
					type='text'
					value={apellido}
					onChange={e => setApellido(e.target.value)}
					placeholder='Ingrese su Apellidos'
					maxLength={110}
				/>
				<Input
					required={true}
					type='number'
					value={dni}
					maxLength={8}
					onChange={e => setDni(e.target.value)}
					placeholder='Ingrese su DNI'
				/>
				<SelectCareer carrera={carrera} setCarrera={setCarrera} />
				<Input
					required={true}
					type='text'
					value={marca}
					onChange={e => setMarca(e.target.value)}
					placeholder='Ingrese la marca de la laptop'
					maxLength={110}
				/>
				<Input
					required={true}
					type='text'
					value={color}
					onChange={e => setColor(e.target.value)}
					placeholder='Ingrese el color de la laptop'
					maxLength={110}
				/>
				<Input
					required={true}
					type='text'
					value={numeroSerie}
					onChange={e => setNumeroSerie(e.target.value)}
					placeholder='Ingrese el numero de serie de la laptop'
					maxLength={110}
				/>
				<Input
					required={true}
					type='text'
					value={objeto}
					onChange={e => setObjeto(e.target.value)}
					placeholder='Ingrese el nombre del objeto'
					maxLength={110}
				/>
				<Input
					required={true}
					type='text'
					value={descripcion}
					onChange={e => setDescripcion(e.target.value)}
					placeholder='Ingrese la descripcion del objeto'
					maxLength={110}
				/>

				<Button name='Registrar' onClick={handleRegistrar} />
			</div>
		</div>
	)
}

export default RegisterData
