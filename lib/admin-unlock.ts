import { createHash } from 'crypto'

export const ADMIN_UNLOCK_COOKIE = 'admin_session'

// SHA-256("id:password") — no plaintext credentials stored in source
const CREDENTIAL_HASH = '613441599baab406edfb0e2c9777a7d12137f81d8892f071cddcdab20abf48b9'

export function hashCredentials(id: string, password: string): string {
  return createHash('sha256').update(`${id}:${password}`).digest('hex')
}

export function isValidCredentials(id: string, password: string): boolean {
  return hashCredentials(id, password) === CREDENTIAL_HASH
}

// The cookie value set on successful unlock
export function isValidCookieValue(value: string): boolean {
  return value === CREDENTIAL_HASH
}
