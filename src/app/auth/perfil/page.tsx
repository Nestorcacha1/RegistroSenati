/* eslint-disable @next/next/no-img-element */
'use client'
import Lefticon from '@/components/icon/Lefticon'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

function Perfil() {
	const { data: session } = useSession()

	return (
		<div>
			<div className='mt-4 ml-5 w-10 bg-slate-400 rounded-md'>
				<Link href={'/'}>
					<Lefticon className='w-9' />
				</Link>
			</div>
			<div className='flex justify-center items-center min-h-screen p-4'>
				<div className='mt-10 flex flex-col items-center bg-blue-200 shadow-lg w-full max-w-md md:max-w-lg lg:max-w-xl h-auto p-6 rounded-lg'>
					<h2 className='text-xl md:text-2xl font-bold mb-5 text-center'>
						Mi Perfil
					</h2>

					<section className='flex flex-col items-center space-y-4'>
						<span className='flex justify-center'>
							<img
								src={session?.user?.image ?? ''}
								alt='User profile'
								className='rounded-full shadow w-24 h-24 md:w-32 md:h-32'
							/>
						</span>
						<div className='flex flex-col md:flex-row items-center md:items-start space-x-0 md:space-x-2 space-y-2 md:space-y-0'>
							<label className='font-semibold'>Nombres y Apellidos:</label>
							<p className='font-normal'>{session?.user?.name}</p>
						</div>
						<div className='flex flex-col md:flex-row items-center md:items-start space-x-0 md:space-x-2 space-y-2 md:space-y-0'>
							<label className='font-semibold'>Correo:</label>
							<p className='font-normal'>{session?.user?.email}</p>
						</div>
						<div className='flex flex-col md:flex-row items-center md:items-start space-x-0 md:space-x-2 space-y-2 md:space-y-0'>
							<label className='font-semibold'>Administrador</label>
							<input type='checkbox' checked={true} readOnly />
						</div>
					</section>
				</div>
			</div>
		</div>
	)
}

export default Perfil
