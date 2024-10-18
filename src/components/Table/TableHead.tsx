import React from 'react'

interface TableHeaderProps {
	isAuthenticated?: boolean
}

const TableHeader: React.FC<TableHeaderProps> = ({ isAuthenticated }) => {
	return (
		<thead>
			<tr className='bg-blue-700'>
				<th className='text-white'>Hora Ent.</th>
				<th>Hora Sali.</th>
				<th>Nombre</th>
				<th>Apellido</th>
				<th>DNI</th>
				<th>Carrera</th>
				<th>Marca</th>
				<th>Número de Serie</th>
				<th>Color</th>
				<th>Nombre Objeto</th>
				<th>Descripción</th>
				<th>Editar</th>
				{isAuthenticated && <th>Eliminar</th>}
			</tr>
		</thead>
	)
}

export default TableHeader
