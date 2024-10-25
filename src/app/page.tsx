'use client'
import Dashboard from '@/components/Dashboard'
import Navbar from '@/components/Navbar'

export default function Home() {
	return (
		<>
			<div className=' w-full bg-blue-300 h-screen'>
				<Navbar />
				<Dashboard />
			</div>
		</>
	)
}
