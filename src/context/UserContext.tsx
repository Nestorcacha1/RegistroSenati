'use client'
import {
	Admin,
	LaptopUpdate,
	ObjetoUpdate,
	User,
	UserRegister,
	UserUpdate,
} from '@/interface/type'
import { createContext, useState } from 'react'

export const UserContext = createContext<{
	users: User[]
	dni: String
	user: Admin[]
	LoadUsers: () => Promise<void>
	LoadSuperUser: () => Promise<void>
	AddUsers: (user: UserRegister) => Promise<void>
	DeleteUser: (id: string) => Promise<void>
	EditUser: (user: UserUpdate, id: string) => Promise<void>
	EditLaptop: (user: LaptopUpdate, id: string) => Promise<void>
	EditObjeto: (user: ObjetoUpdate, id: string) => Promise<void>
	SearchDni: (dni: string) => Promise<User | String>
}>({
	users: [],
	dni: '',
	user: [],
	LoadUsers: async () => {},
	LoadSuperUser: async () => {},
	AddUsers: async (user: UserRegister) => {},
	DeleteUser: async (id: string) => {},
	EditUser: async (user: UserUpdate, id: string) => {},
	EditLaptop: async (user: LaptopUpdate, id: string) => {},
	EditObjeto: async (user: ObjetoUpdate, id: string) => {},
	SearchDni: async (dni: string): Promise<User | String> => {
		return dni
	},
})

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
	const [users, setUsers] = useState<User[]>([])
	const [dni, setDni] = useState<string | null>(null)
	const [user, setUser] = useState<Admin[]>([])
	async function LoadUsers() {
		const response = await fetch('/api/user')
		const data = await response.json()
		setUsers(data)
	}
	async function LoadSuperUser() {
		const response = await fetch('/api/admin')
		const data = await response.json()
		setUser(data)
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

	async function SearchDni(dni: string): Promise<User | String> {
		const response = await fetch(`http://localhost:3000/api/user/dni/${dni}`)
		const data = await response.json()
		if (data.message === null) {
			return data.message
		}
		setDni(data.dni)
		return data // Asegúrate de devolver los datos aquí
	}

	return (
		<UserContext.Provider
			value={{
				users,
				user,
				LoadUsers,
				AddUsers,
				DeleteUser,
				EditUser,
				EditLaptop,
				EditObjeto,
				SearchDni,
				LoadSuperUser,
				dni: dni || '',
			}}
		>
			{children}
		</UserContext.Provider>
	)
}
