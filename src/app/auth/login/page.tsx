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
	const callbackUrl = searchParams.get('callbackUrl') || '/'

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
				<div className='flex flex-col items-center justify-center p-6 space-y-6 bg-white rounded-lg shadow-lg sm:w-3/4 md:w-1/2 lg:w-1/3'>
					<h2 className='text-xl font-bold text-center text-gray-800 sm:text-2xl md:text-3xl'>
						Inicio De Sesión Del Administrador
					</h2>
					<button
						onClick={handleGoogleSignIn}
						className='px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600'
					>
						Iniciar sesión con Google
					</button>
				</div>
			</div>
		)
	}

	return null
}

export default LoginPage
