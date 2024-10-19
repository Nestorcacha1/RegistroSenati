import React from 'react'

interface TableHeaderProps {
	isAuthenticated?: boolean
}

const TableHeader: React.FC<TableHeaderProps> = ({ isAuthenticated }) => {
	return (
		<thead className='text-slate-200 font-semibold py-2 px-2'>
			<tr className='bg-se-primary'>
				<th>Hora Ent.</th>
				<th>Hora Sali.</th>
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
