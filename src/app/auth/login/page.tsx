'use client'

import { useEffect } from 'react'
import { signIn, useSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import DownIcon from '@/components/icon/DownIcon'

function LoginPage() {
	const { data: session, status } = useSession()
	const router = useRouter()
	const searchParams = useSearchParams()
	const callbackUrl = searchParams.get('callbackUrl') || '/auth/login'

	useEffect(() => {
		if (status === 'authenticated') {
			router.push(callbackUrl)
		}
	}, [status, router, callbackUrl])

	const handleGoogleSignIn = async () => {
		try {
			await signIn('google', {
				callbackUrl: decodeURIComponent(callbackUrl),
				redirect: true,
			})
		} catch (error) {
			console.error('Error durante el inicio de sesión:', error)
		}
	}

	// Si está cargando, mostrar un estado de carga
	if (status === 'loading') {
		return (
			<div className='flex items-center justify-center min-h-screen bg-blue-300'>
				<div className='animate-spin rounded-full h-12 w-12 border-b-2 border-white'></div>
			</div>
		)
	}

	// Si no está autenticado, mostrar el formulario de login
	if (status === 'unauthenticated') {
		return (
			<div className='flex flex-col items-center justify-center min-h-screen bg-blue-300'>
				<div className='flex flex-col items-center justify-center p-6 space-y-6 bg-blue-800 rounded-lg shadow-lg sm:w-3/4 md:w-1/2 lg:w-1/3'>
					<h2 className='text-xl font-bold text-center text-white sm:text-2xl md:text-3xl'>
						Inicio De Sesión Del Administrador
					</h2>

					<DownIcon className='w-12 h-12 text-blue-500 font-bold animate-bounce' />

					<button
						onClick={handleGoogleSignIn}
						className='bg-white border border-gray-300 hover:bg-blue-700 hover:text-white delay-75 focus:outline-none rounded-xl flex items-center justify-center p-3 space-x-2 shadow-md transition-transform transform hover:scale-105'
					>
						<Image
							src='/google.png'
							alt='google'
							width={24}
							height={24}
							className='w-6 h-6'
						/>
						<span className='text-gray-700 font-medium group-hover:text-white hover:text-white'>
							Sign in with Google
						</span>
					</button>

					<span className='text-center text-sm text-white sm:text-base'>
						Inicia sesión con Google
					</span>
				</div>
			</div>
		)
	}

	// No renderizar nada si está autenticado (el useEffect se encargará de la redirección)
	return null
}

export default LoginPage
