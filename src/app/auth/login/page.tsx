'use client'
import DownIcon from '@/components/icon/DownIcon'
import { signIn, useSession } from 'next-auth/react'
import Image from 'next/image'
import { redirect } from 'next/navigation'

function LoginPage() {
	const { data: sesion } = useSession()

	if (!sesion) {
		return (
			<div className='flex flex-col items-center justify-center min-h-screen bg-blue-300'>
				<div className='flex flex-col items-center justify-center p-6 space-y-6 bg-white rounded-lg shadow-lg sm:w-3/4 md:w-1/2 lg:w-1/3'>
					<h2 className='text-xl font-bold text-center text-gray-800 sm:text-2xl md:text-3xl'>
						Inicio De Sesión Del Administrador
					</h2>

					<DownIcon className='w-12 h-12 text-blue-500 font-bold animate-bounce' />

					<button
						onClick={() => signIn('google')}
						className='bg-white border border-gray-300 hover:bg-blue-700 delay-75 focus:outline-none rounded-xl flex items-center justify-center p-3 space-x-2 shadow-md transition-transform transform hover:scale-105'
					>
						<Image src='/google.png' alt='google' width={24} height={24} />
						<span className='text-gray-700 font-medium hover:text-white'>
							Sign in with Google
						</span>
					</button>

					<span className='text-center text-sm text-black sm:text-base'>
						Inicia sesión con Google
					</span>
				</div>
			</div>
		)
	}

	return (
		<div>
			{sesion.user && <h1>Logged in as {sesion.user.email}</h1>}
			{redirect('/')}
		</div>
	)
}

export default LoginPage
