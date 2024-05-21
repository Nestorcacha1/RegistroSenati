interface User {
	name: string
	email: string
	emailVerified: Date
	image: string
}

interface Account {
	userId: string
	provider: string
	type: string
	providerAccountId: string
	access_token: string
	expires_at: string
}

interface Session {
	sessionToken: string
	userId: string
	expires: Date
}

export default function PostgresAdapter(client: any, options = {}) {
	return {
		async createUser(user: User) {
			const sql = `
        INSERT INTO users (name, email, email_verified, image) 
        VALUES ($1, $2, $3, $4) 
        RETURNING id, name, email, email_verified, image`
			const result = await client.query(sql, [
				user.name,
				user.email,
				user.emailVerified,
				user.image,
			])
			return result.rows[0]
		},
		async getUser(id: string) {
			const sql = `select * from users where id = $1`
			const result = await client.query(sql, [id])
			return result.rows[0]
		},
		async getUserByEmail(email: string) {
			const sql = `select * from users where email = $1`
			const result = await client.query(sql, [email])
			return result.rows[0]
		},
		async getUserByAccount({
			providerAccountId,
			provider,
		}: {
			providerAccountId: string
			provider: string
		}) {
			const sql = `
        select u.* from users u join accounts a on u.id = a.user_id 
        where 
        a.provider_id = $1 
        and 
        a.provider_account_id = $2`
			const result = await client.query(sql, [provider, providerAccountId])
			return result.rows[0]
		},
		async updateUser(user: any) {
			// Implement this function
		},
		async linkAccount(account: Account) {
			const sql = `
        insert into accounts 
        (
          user_id, 
          provider_id, 
          provider_type, 
          provider_account_id, 
          access_token,
          access_token_expires
        )
        values ($1, $2, $3, $4, $5, to_timestamp($6))`
			const params = [
				account.userId,
				account.provider,
				account.type,
				account.providerAccountId,
				account.access_token,
				account.expires_at,
			]
			await client.query(sql, params)
			return account
		},
		async createSession({ sessionToken, userId, expires }: Session) {
			const sql = `insert into sessions (user_id, expires, session_token) values ($1, $2, $3)`
			await client.query(sql, [userId, expires, sessionToken])
			return { sessionToken, userId, expires }
		},
		async getSessionAndUser(sessionToken: string) {
			let result = await client.query(
				'select * from sessions where session_token = $1',
				[sessionToken]
			)
			let session = result.rows[0]
			result = await client.query('select * from users where id = $1', [
				session.user_id,
			])
			let user = result.rows[0]
			return {
				session,
				user,
			}
		},
		async updateSession({ sessionToken }: { sessionToken: string }) {
			// Implement this function
		},
		async deleteSession(sessionToken: string) {
			const sql = `delete from sessions where session_token = $1`
			await client.query(sql, [sessionToken])
		},
	}
}
