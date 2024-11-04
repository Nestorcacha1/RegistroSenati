import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default NextAuth({
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
							nombre: user.name?.split(' ')[0] || '',
							isAdmin: false,
							apellido: user.name?.split(' ')[1] || '',
						},
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
