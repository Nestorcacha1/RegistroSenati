import React from 'react'
import Link from 'next/link'
import UserIcon from './icon/UserIcon'
function Navbar() {
	return (
		<div className='mt-5 flex col-span-6 gap-5 justify-end font-bold py-2 text-lg'>
			<span className='bg-blue-500 rounded-md '>
				<Link href={'/auth/perfil'}>
					<UserIcon className='w-10' />
				</Link>
			</span>
			<span className='bg-blue-500 rounded-md py-1'>
				<Link href={'/auth/registro'}> Todo los registros</Link>
			</span>
		</div>
	)
}

export default Navbar
