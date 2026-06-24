import { randomBytes } from 'crypto'

const ADMIN_PASS = process.env.ADMIN_PASS || 'firsthep2026'
const sessions = new Map<string, number>() // token -> expires_at

export function loginAdmin(password: string): string | null {
  if (password !== ADMIN_PASS) return null
  const token = randomBytes(32).toString('hex')
  sessions.set(token, Date.now() + 86400_000) // 24h
  return token
}

export function checkAuth(event: any) {
  const auth = getHeader(event, 'authorization')
  if (!auth?.startsWith('Bearer ')) {
    throw createError({ statusCode: 401, message: 'Missing authorization header' })
  }
  const token = auth.slice(7)
  const expires = sessions.get(token)
  if (!expires || expires < Date.now()) {
    sessions.delete(token)
    throw createError({ statusCode: 401, message: 'Session expired, please login again' })
  }
}
