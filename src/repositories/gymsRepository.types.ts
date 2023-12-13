import { Decimal } from '@prisma/client/runtime/library'

export type Gym = {
  id?: string
  title: string
  description: string | null
  phone: string | null
  latitude: Decimal | number
  longitude: Decimal | number
}

export interface GymsRepository {
  findById(id: string): Promise<Gym | null>
  searchMany(query: string, page: number): Promise<Gym[]>
  create(data: Gym): Promise<Gym>
}
