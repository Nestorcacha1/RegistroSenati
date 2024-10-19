import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import SalirIcon from './icon/ExitIcon'
import UserIcon from './icon/UserIcon'
import Button from './Button'

function Navbar() {
	const { data: session, status } = useSession()

	async function Logout() {
		await signOut({ redirect: true, callbackUrl: '/auth/login' })
	}

	if (status === 'unauthenticated') {
		return null
	}
	return (
		<div className='mt-2 flex col-span-6 gap-5 justify-end font-bold py-2 text-lg mx-5'>
			<Button name={''}>
				<Link href={'/auth/perfil'} className='text-sm'>
					<UserIcon className='w-6' />
					Perfil
				</Link>
			</Button>

			<Button name={''}>
				<Link href={'/auth/allregisters'}> Todos los Registros</Link>
			</Button>

			<button
				onClick={Logout}
				className='bg-slate-200 rounded-lg hover:bg-slate-300 mr-5'
				title='Salir'
			>
				<SalirIcon />
			</button>
		</div>
	)
}

export default Navbar
