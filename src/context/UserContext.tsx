'use client'
import {
	LaptopUpdate,
	ObjetoUpdate,
	User,
	UserRegister,
	UserUpdate,
} from '@/libs/type'
import { createContext, useState } from 'react'

export const UserContext = createContext<{
	users: User[]
	LoadUsers: () => Promise<void>
	AddUsers: (user: UserRegister) => Promise<void>
	DeleteUser: (id: string) => Promise<void>
	EditUser: (user: UserUpdate, id: string) => Promise<void>
	EditLaptop: (user: LaptopUpdate, id: string) => Promise<void>
	EditObjeto: (user: ObjetoUpdate, id: string) => Promise<void>
}>({
	users: [],
	LoadUsers: async () => {},
	AddUsers: async (user: UserRegister) => {},
	DeleteUser: async (id: string) => {},
	EditUser: async (user: UserUpdate, id: string) => {},
	EditLaptop: async (user: LaptopUpdate, id: string) => {},
	EditObjeto: async (user: ObjetoUpdate, id: string) => {},
})

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
	const [users, setUsers] = useState<User[]>([])
	async function LoadUsers() {
		const response = await fetch('/api/user')
		const data = await response.json()
		setUsers(data)
	}

	async function AddUsers(user: UserRegister) {
		const response = await fetch('http://localhost:3000/api/user', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(user),
		})
		const newUser = await response.json()
		setUsers([...users, newUser])
	}

	async function EditUser(user: UserUpdate, id: string) {
		const response = await fetch(`http://localhost:3000/api/user/${id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(user),
		})
		const newUser = await response.json()
		setUsers([...users, newUser])
	}

	async function EditLaptop(user: LaptopUpdate, id: string) {
		const response = await fetch(`http://localhost:3000/api/laptop/${id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(user),
		})
		const newUser = await response.json()
		setUsers([...users, newUser])
	}

	async function EditObjeto(user: ObjetoUpdate, id: string) {
		const response = await fetch(`http://localhost:3000/api/objeto/${id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(user),
		})
		const newUser = await response.json()
		setUsers([...users, newUser])
	}

	async function DeleteUser(id: string) {
		await fetch(`/api/user/${id}`, {
			method: 'DELETE',
		})
	}

	return (
		<UserContext.Provider
			value={{
				users,
				LoadUsers,
				AddUsers,
				DeleteUser,
				EditUser,
				EditLaptop,
				EditObjeto,
			}}
		>
			{children}
		</UserContext.Provider>
	)
}
