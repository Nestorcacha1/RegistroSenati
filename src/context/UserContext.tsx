'use client'

import {
	Admin,
	LaptopUpdate,
	ObjetoUpdate,
	User,
	UserRegister,
	UserUpdate,
	TimeEdit,
} from '@/interface/type'
import { createContext, useState } from 'react'

export const UserContext = createContext<{
	users: User[]
	dni: String
	count: number | undefined
	nextPage: string | null | undefined
	previousPage: string | null | undefined
	previousNumber: string | number | null | undefined
	nextNumber: string | number | undefined | null

	countT: number | undefined
	nextPageT: string | null | undefined
	previousPageT: string | null | undefined
	previousNumberT: string | number | null | undefined
	nextNumberT: string | number | undefined | null
	LoadUsersPaginated: (page: number) => Promise<void>
	LoadUsersTotal: (page: number) => Promise<void>
	AddUsers: (user: UserRegister) => Promise<void>
	DeleteUser: (id: string) => Promise<void>
	EditUser: (user: UserUpdate, id: string) => Promise<void>
	EditLaptop: (user: LaptopUpdate, id: string) => Promise<void>
	EditObjeto: (user: ObjetoUpdate, id: string) => Promise<void>
	SearchDni: (dni: string) => Promise<User | String>
	ExitUser: (id: string, dni: string) => Promise<TimeEdit>
}>({
	users: [],
	dni: '',
	count: 1,
	nextPage: '',
	previousPage: '',
	previousNumber: 0,
	nextNumber: 0,

	countT: 1,
	nextPageT: '',
	previousPageT: '',
	previousNumberT: 0,
	nextNumberT: 0,
	LoadUsersPaginated: async (page: number) => {},
	LoadUsersTotal: async (page: number) => {},
	AddUsers: async (user: UserRegister) => {},
	DeleteUser: async (id: string) => {},
	EditUser: async (user: UserUpdate, id: string) => {},
	EditLaptop: async (user: LaptopUpdate, id: string) => {},
	EditObjeto: async (user: ObjetoUpdate, id: string) => {},
	SearchDni: async (dni: string): Promise<User | String> => {
		return dni
	},
	ExitUser: async (id: string, dni: string) => {
		return { updatedAt: '', dni }
	},
})

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
	const [users, setUsers] = useState<User[]>([])
	const [dni, setDni] = useState<string | null>(null)

	const [count, setCount] = useState<number>()
	const [nextPage, setNextPage] = useState<string | null>()
	const [previousPage, setPreviousPage] = useState<string | null>()
	const [previousNumber, SetPreviousNumber] = useState<number>()
	const [nextNumber, SetNextNumber] = useState<number>()

	const [countT, setCountT] = useState<number>()
	const [nextPageT, setNextPageT] = useState<string | null>()
	const [previousPageT, setPreviousPageT] = useState<string | null>()
	const [previousNumberT, SetPreviousNumberT] = useState<number>()
	const [nextNumberT, SetNextNumberT] = useState<number>()

	async function LoadUsersPaginated(page: number): Promise<void> {
		try {
			const response = await fetch(`/api/user?filterByTime&page=${page}`)
			const data = await response.json()
			console.log(data)
			setUsers(data.results)
			setCount(data.count)
			setNextPage(data.next)
			setPreviousPage(data.previous)
			SetPreviousNumber(data.previousNumber)
			SetNextNumber(data.nextNumber)
		} catch (error) {
			console.error('Error al cargar usuarios con paginación', error)
			throw new Error('Error al cargar usuarios con paginación')
		}
	}

	// Función para cargar usuarios filtrados por horas con paginación
	async function LoadUsersTotal(page: number) {
		try {
			const response = await fetch(`/api/user/total?page=${page}`)
			const data = await response.json()
			console.log(data)
			setUsers(data.results)
			setCountT(data.count)
			setNextPageT(data.next)
			setPreviousPageT(data.previous)
			SetPreviousNumberT(data.previousNumber)
			SetNextNumberT(data.nextNumber)
		} catch (error) {
			console.error('Error al cargar todo los usuarios', error)
		}
	}

	async function AddUsers(user: UserRegister): Promise<void> {
		try {
			const response = await fetch('http://localhost:3000/api/user', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(user),
			})
			if (!response.ok) {
				throw new Error('Error al agregar el usuario')
			}
			const newUser = await response.json()
			setUsers([...users, newUser])
		} catch (error) {
			console.error(error, 'Error al agregar el usuario')
			throw new Error('Error al agregar el usuario')
		}
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
		try {
			const response = await fetch(`http://localhost:3000/api/user/dni/${dni}`)
			const data = await response.json()
			if (data.message === null) {
				return data.message('Usuario no encontrado')
			}
			setDni(data.dni)
			return data // Devolver el usuario encontrado
		} catch (error) {
			console.error(error)
			return 'Error al buscar el usuario'
		}
	}

	async function ExitUser(id: string, dni: string) {
		const exitTime = new Date().toISOString() // Obtener la hora actual en formato ISO 8601

		const response = await fetch(`http://localhost:3000/api/user/${id}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ exitTime, dniDigits: dni }),
			// Enviar la hora actual en el cuerpo de la solicitud
		})

		// console.log(response)
		if (!response.ok) {
			throw new Error('Error al actualizar la hora del usuario')
		}

		const data = await response.json()
		return data
	}

	return (
		<UserContext.Provider
			value={{
				users,
				count,
				nextPage,
				previousPage,
				nextNumber,
				previousNumber,

				countT,
				nextPageT,
				previousPageT,
				previousNumberT,
				nextNumberT,

				LoadUsersPaginated,
				LoadUsersTotal,
				AddUsers,
				DeleteUser,
				EditUser,
				EditLaptop,
				EditObjeto,
				SearchDni,
				ExitUser,
				dni: dni || '',
			}}
		>
			{children}
		</UserContext.Provider>
	)
}
