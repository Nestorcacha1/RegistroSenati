import NextAuth, { getServerSession } from 'next-auth/next'
import GoogleProvider from 'next-auth/providers/google'
import prisma from '@/libs/db'
import { Admin } from '@prisma/client'
import Email from 'next-auth/providers/email'
const handler = NextAuth({
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
		}),
	],
	callbacks: {
		async session({ session, token }: { session: any; token: any }) {
			session.user.id = token.sub as string

			return session
		},
		async jwt({ token, user }) {
			if (user) {
				const fetchedUser = await prisma.admin.findUnique({
					where: { email: user.email as string },
				})

				if (!fetchedUser) {
					const newUser = await prisma.admin.create({
						data: {
							email: user.email as string,
							password: '',
							nombre: user.name?.split(' ')[0] || '',
							isAdmin: false,
							apellido: user.name?.split(' ')[1] || '',
						} as any,
					})
					token.sub = newUser.id.toString()
				} else {
					token.sub = fetchedUser.id.toString()
				}
			}

			return token
		},
	},
})

export async function isAdmin() {
	const session = (await getServerSession(handler)) as {
		user?: { email?: string }
	}

	const userEmail = session?.user?.email

	if (!userEmail) {
		return false
	}

	const userInfo = await prisma.admin.findUnique({
		where: { email: userEmail },
	})

	if (!userInfo) {
		return false
	}

	// Verificar si el usuario es administrador
	return userInfo.isAdmin
}
export { handler as GET, handler as POST }
