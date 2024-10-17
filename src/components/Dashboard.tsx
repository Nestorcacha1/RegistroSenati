import React, { useContext, useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import toast from 'react-hot-toast'
import CurrentDate from './Date'
import SearchDni from './SearchDni'
import Title from './Title'
import UserFooter from './Table/UserFooter'
import UserTable from '@/components/Table/UserTable'
import { UserContext } from '@/context/UserContext'

function Dashboard() {
	const { data: session, status } = useSession()
	const {
		users,
		LoadUsersPaginated,
		DeleteUser,
		dni,
		count,
		nextPage,
		previousPage,
		nextNumber,
		previousNumber,
	} = useContext(UserContext)

	const [currentPage, setCurrentPage] = useState(1)

	if (dni) {
		users.sort((a, b) => {
			if (a.dni === dni) return -1
			if (b.dni === dni) return 1
			return 0
		})
	}

	useEffect(() => {
		LoadUsersPaginated(1)
	}, [])

	async function handleDeleteUser(id: string) {
		await DeleteUser(id)
		LoadUsersPaginated(currentPage)
		toast.success('Usuario eliminado correctamente')
	}

	const handleNextPage = () => {
		if (nextPage) {
			setCurrentPage(currentPage + 1) // Cambia la página
			LoadUsersPaginated(currentPage + 1) // Carga la nueva página
		}
	}

	const handlePreviousPage = () => {
		if (previousPage && currentPage > 1) {
			setCurrentPage(currentPage - 1) // Cambia la página
			LoadUsersPaginated(currentPage - 1) // Carga la página anterior
		}
	}

	return (
		<div className='lg:container mx-auto px-2'>
			<div className='text-center'>
				<Title name='Registro de Ingreso y Salida de Laptops de Estudiantes' />
			</div>
			<div className='text-center my-4'>
				<CurrentDate />
			</div>
			<div className='flex flex-col md:flex-row justify-between items-center'>
				<button className='md:w-auto py-2 px-4 mt-2 text-white bg-blue-500 hover:bg-blue-700 rounded mb-4 md:mb-8 ml-0 md:ml-5'>
					<a href='/auth/registerdata'>Registrar</a>
				</button>
				<span className='w-full md:w-auto mr-0 md:mr-8 '>
					<SearchDni />
				</span>
			</div>

			<section className='overflow-x-auto rounded-lg'>
				<UserTable
					users={users || []}
					dni={dni ? dni.toString() : ''}
					isAuthenticated={status === 'authenticated'}
					onDeleteUser={handleDeleteUser}
				/>
				<UserFooter
					count={count}
					next={nextNumber || 'Final'}
					previous={previousNumber || 'Inicio'}
					isFirstPage={currentPage === 1}
					isLastPage={!nextPage}
					onNext={handleNextPage}
					onPrevious={handlePreviousPage}
				/>
			</section>
		</div>
	)
}

export default Dashboard
