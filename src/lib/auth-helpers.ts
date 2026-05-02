import { createHmac, randomBytes, scryptSync, timingSafeEqual } from 'crypto'

const SECRET = process.env.AUTH_SECRET || 'fallback-secret-for-dev-only'

export function createToken(payload: Record<string, string>) {
  const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url')
  const body = Buffer.from(JSON.stringify({ ...payload, exp: Date.now() + 2 * 60 * 60 * 1000 })).toString('base64url')
  const signature = createHmac('sha256', SECRET).update(`${header}.${body}`).digest('base64url')
  return `${header}.${body}.${signature}`
}

export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString('hex')
  const hash = scryptSync(password, salt, 64).toString('hex')
  return `${salt}:${hash}`
}

export function verifyPassword(password: string, stored: string): boolean {
  const [salt, hash] = stored.split(':')
  const hashBuffer = Buffer.from(hash, 'hex')
  const inputHash = scryptSync(password, salt, 64)
  return timingSafeEqual(hashBuffer, inputHash)
}
