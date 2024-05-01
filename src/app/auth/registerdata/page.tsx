'use client'
import Button from '@/components/Button'
import Input from '@/components/Input'
import Title from '@/components/Title'
import { UserContext } from '@/context/UserContext'
import { redirect } from 'next/navigation'
import { useContext, useState } from 'react'

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
				/>
				<Input
					required={true}
					type='text'
					value={apellido}
					onChange={e => setApellido(e.target.value)}
					placeholder='Ingrese su Apellidos'
				/>
				<Input
					required={true}
					type='text'
					value={dni}
					onChange={e => setDni(e.target.value)}
					placeholder='Ingrese su DNI'
				/>

				<select
					className='border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 mt-2 bg-slate-50'
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
				<Input
					required={true}
					type='text'
					value={marca}
					onChange={e => setMarca(e.target.value)}
					placeholder='Ingrese la marca de la laptop'
				/>
				<Input
					required={true}
					type='text'
					value={color}
					onChange={e => setColor(e.target.value)}
					placeholder='Ingrese el color de la laptop'
				/>
				<Input
					required={true}
					type='text'
					value={numeroSerie}
					onChange={e => setNumeroSerie(e.target.value)}
					placeholder='Ingrese el numero de serie de la laptop'
				/>
				<Input
					required={true}
					type='text'
					value={objeto}
					onChange={e => setObjeto(e.target.value)}
					placeholder='Ingrese el nombre del objeto'
				/>
				<Input
					required={true}
					type='text'
					value={descripcion}
					onChange={e => setDescripcion(e.target.value)}
					placeholder='Ingrese la descripcion del objeto'
				/>

				<Button name='Registrar' onClick={handleRegistrar} />
			</div>
		</div>
	)
}

export default RegisterData
