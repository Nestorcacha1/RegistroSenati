'use client'
import { signIn, useSession } from 'next-auth/react'
import Image from 'next/image'
import { redirect } from 'next/navigation'
function LoginPage() {
	const { data: sesion } = useSession()

	if (!sesion) {
		return (
			<div className='flex items-center justify-center min-h-screen bg-gray-100'>
				<div className='flex flex-col items-center justify-center p-6 space-y-6 bg-white rounded-lg shadow-lg sm:w-3/4 md:w-1/2 lg:w-1/3'>
					<h2 className='text-xl font-bold text-center text-gray-800 sm:text-2xl md:text-3xl'>
						Inicio De Sesión Del Administrador
					</h2>
					<button
						onClick={() => {
							signIn('google')
						}}
						className='bg-blue-300 rounded-full p-3 sm:p-4 md:p-5 flex items-center justify-center space-x-2'
					>
						<Image src='/google.png' alt='google' width={60} height={60} />
					</button>
					<span className='text-center text-sm text-gray-700 sm:text-base'>
						Inicia sesión con Google
					</span>
				</div>
			</div>
		)
	}

	return (
		<div>
			{sesion.user && <h1>logged in {sesion.user.email}</h1>} {redirect('/')}
		</div>
	)
}

export default LoginPage
