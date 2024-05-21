'use client'
import Dashboard from '@/components/Dashboard'
import Navbar from '@/components/Navbar'
import { UserProvider } from '@/context/UserContext'
import { SessionProvider } from 'next-auth/react'
import { Toaster } from 'react-hot-toast'

export default function Home() {
	return (
		<>
			<Navbar />
			<Dashboard />
		</>
	)
}
