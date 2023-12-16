export type RegisterServiceProps = {
  name: string
  email: string
  password: string
  role?: 'ADMIN' | 'MEMBER'
}
