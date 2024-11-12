import React from 'react'

interface TableHeaderProps {
	isAuthenticated?: boolean
}

const TableHeader: React.FC<TableHeaderProps> = ({ isAuthenticated }) => {
	return (
		<thead>
			<tr className='bg-se-primary text-white'>
				<th>Hora Entrada</th>
				<th>Hora Salida</th>
				<th>Nombre</th>
				<th>Apellido</th>
				<th>DNI</th>
				<th>Carrera</th>
				<th>Marca</th>
				<th>Número de Serie</th>
				<th>Color</th>
				<th>Objetos</th>
				<th>Descripción</th>
				<th>Editar</th>
				{isAuthenticated && <th>Eliminar</th>}
			</tr>
		</thead>
	)
}

export default TableHeader
