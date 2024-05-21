import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import SalirIcon from './icon/SalirIcon'
import UserIcon from './icon/UserIcon'

function Navbar() {
	const { data: session, status } = useSession()

	async function Logout() {
		await signOut({ redirect: true, callbackUrl: '/auth/login' })
	}

	if (status === 'unauthenticated') {
		return null
	}
	return (
		<div className='mt-5 flex col-span-6 gap-5 justify-end font-bold py-2 text-lg'>
			<>
				<span className='bg-blue-400 rounded-md ' title='Perfil'>
					<Link href={'/auth/perfil'}>
						<UserIcon className='w-10' />
					</Link>
				</span>
				<>
					<span className='bg-blue-400 rounded-md py-1'>
						<Link href={'/auth/allregisters'}> Todo los registros</Link>
					</span>
				</>

				<button
					onClick={Logout}
					className='bg-slate-200 rounded-lg hover:bg-slate-300 mr-5'
					title='Salir'
				>
					<SalirIcon />
				</button>
			</>
		</div>
	)
}

export default Navbar
