export const ADMIN_EMAILS = ['rkadel1488@gmail.com']

export function isAdminEmail(email: string | null | undefined): boolean {
  return !!email && ADMIN_EMAILS.includes(email.toLowerCase())
}
