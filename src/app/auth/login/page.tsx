'use client'
import Button from '@/components/Button'
import Input from '@/components/Input'
import { useSession, signIn } from 'next-auth/react'
import { redirect } from 'next/navigation'
import Image from 'next/image'
function LoginPage() {
	const { data: sesion } = useSession()

	if (!sesion) {
		return (
			<div className='flex items-center justify-center h-screen bg-gray-100'>
				<div className='flex flex-col items-center justify-center p-4 space-y-4 bg-white rounded shadow h-1/2 w-1/2'>
					<h2 className='text-2xl font-bold text-center text-gray-800 '>
						Inicio De Sesión Del Administrador
					</h2>
					<button
						onClick={() => {
							signIn('google')
						}}
						className='bg-blue-300 rounded-full p-2 w-20 h-20 flex items-center justify-center space-x-2'
					>
						<Image src='/google.png' alt='google' width={60} height={60} />
					</button>
					<span className='text-center bg-sky-100'>
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
