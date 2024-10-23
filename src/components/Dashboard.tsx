import React, { useContext, useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import toast from 'react-hot-toast'
import CurrentDate from './Date'
import SearchDni from './SearchDni'
import Title from './Title'
import UserFooter from './Table/UserFooter'
import UserTable from '@/components/Table/UserTable'
import { UserContext } from '@/context/UserContext'
import Button from './Button'

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
		<div className='lg:container mx-auto px-1'>
			<div className='lg:container mx-auto px-1'>
				<header className='text-center'>
					<Title name='Registro de Ingreso y Salida de Laptops de Estudiantes' />
				</header>
				<section className='text-center justify-center flex my-2'>
					<CurrentDate />
				</section>
				<section className='flex flex-col md:flex-row justify-between items '>
					<Button name={'Registrar'}>
						<a href='/auth/registerdata'>Registrar</a>
					</Button>
					<div className='w-full md:w-auto mr-0 md:mr-8 '>
						<SearchDni />
					</div>
				</section>
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
