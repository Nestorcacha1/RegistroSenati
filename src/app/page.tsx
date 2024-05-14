'use client'
import Dashboard from '@/components/Dashboard'
import Navbar from '@/components/Navbar'
import SearchDni from '@/components/SearchDni'
import { useState } from 'react'

export default function Home() {
	return (
		<>
			<Navbar />
			<Dashboard />
		</>
	)
}
