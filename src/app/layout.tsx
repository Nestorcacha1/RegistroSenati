'use client'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { UserProvider } from '@/context/UserContext'
import { Toaster } from 'react-hot-toast'
import { SessionProvider } from 'next-auth/react'
const inter = Inter({ subsets: ['latin'] })

interface Props {
	children: React.ReactNode
}

export default function RootLayout({ children }: Props) {
	return (
		<html lang='en'>
			<body className={inter.className}>
				<SessionProvider>
					<UserProvider>
						<Toaster />
						{children}
					</UserProvider>
				</SessionProvider>
			</body>
		</html>
	)
}
