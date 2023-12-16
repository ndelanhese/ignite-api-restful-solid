export type User = {
  id?: string | undefined
  name: string
  email: string
  password_hash: string
  role: 'ADMIN' | 'MEMBER'
  created_at?: string | Date | undefined
}

export interface UsersRepository {
  create(data: User): Promise<User>
  findByEmail(email: string): Promise<User | null>
  findById(id: string): Promise<User | null>
}
