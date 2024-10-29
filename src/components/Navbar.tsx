'use client'
import { signOut, useSession } from 'next-auth/react'
import Button from './Button'
import SalirIcon from './icon/ExitIcon'
import UserIcon from './icon/UserIcon'
import router from 'next/router'

function Navbar() {
	const { data: session, status } = useSession()

	const handleLogout = async () => {
		try {
			await signOut({
				redirect: true,
				callbackUrl: '/auth/login',
			})
		} catch (error) {
			console.error('Error durante el logout:', error)
		}
	}

	if (status !== 'authenticated') {
		return null // No renderiza nada si no está autenticado o la autenticación está cargando
	}
	return (
		<nav className='flex col-span-6 gap-5 justify-end font-bold py-2 text-lg mx-5'>
			{/* Botón de Perfil */}
			<Button href='/auth/perfil' name='Perfil'>
				<div className='flex items-center gap-2 text-sm'>
					<UserIcon className='w-6' />
					<span>Perfil</span>
				</div>
			</Button>

			{/* Botón de Registros */}
			<Button href='/auth/allregisters' name='Registros'>
				Todos los Registros
			</Button>

			{/* Botón de Salir */}
			<Button onClick={handleLogout} name='Salir'>
				<div className='flex items-center gap-2'>
					<SalirIcon />
					<span className='sr-only'>Salir</span>
				</div>
			</Button>
		</nav>
	)
}

export default Navbar
