import React from 'react'

interface props {
	carrera: string
	setCarrera: React.Dispatch<React.SetStateAction<string>>
}

function SelectCareer({ carrera, setCarrera }: props) {
	return (
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
			<option value='Seguridad Ind. y Prevención de R.'>
				Seguridad Ind. y Prevención de R.
			</option>
			<option value='Mecánico de Automotores Diesel'>
				Mecánico de Automotores Diesel
			</option>
			<option value='Mecánico de Mantenimiento'>
				Mecánico de Mantenimiento
			</option>
			<option value='Diseño Gráfico Digital'>Diseño Gráfico Digital</option>
			<option value='Mecánico Automotriz'>Mecánico Automotriz</option>
			<option value='Ing. de Software con I.A'>Ing. de Software con I.A</option>
			<option value='Administración de Empresas'>
				Administración de Empresas
			</option>
			<option value='Ingeniería de Soporte de TI'>
				Ingeniería de Soporte de TI
			</option>
		</select>
	)
}

export default SelectCareer
