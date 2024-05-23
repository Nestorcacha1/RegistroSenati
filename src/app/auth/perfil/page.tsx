/* eslint-disable @next/next/no-img-element */
'use client'
import Lefticon from '@/components/icon/Lefticon'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

function Perfil() {
	const { data: session } = useSession()

	return (
		<div>
			<div className='mt-4 ml-5 w-10 bg-slate-400 rounded-md '>
				<Link href={'/'}>
					<Lefticon className='w-9' />
				</Link>
			</div>
			<div className='flex justify-center items-center h-screen'>
				<div className='mt-30 flex flex-col items-center bg-blue-200 shadow-lg w-1/2 h-auto p-5 rounded-lg'>
					<h2 className='text-2xl font-bold mb-5'>Mi Perfil</h2>

					<section className='flex flex-col items-start space-y-2 '>
						<span className='flex'>
							<img
								src={session?.user?.image ?? ''}
								alt='User profile'
								className='rounded-full shadow flex-auto'
							/>
						</span>
						<div className='flex items-center space-x-2'>
							<label className='font-semibold'>Nombres y Apellidos:</label>
							<p className='font-normal'>{session?.user?.name}</p>
						</div>
						<div className='flex items-center space-x-2'>
							<label className='font-semibold'>Correo:</label>
							<p className='font-normal'>{session?.user?.email}</p>
						</div>
						<div className='flex items-center space-x-2'>
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
