import { Decimal } from '@prisma/client/runtime/library'

export type Gym = {
  id?: string
  title: string
  description: string | null
  phone: string | null
  latitude: Decimal | number
  longitude: Decimal | number
}

export type findManyNearbyProps = { latitude: number; longitude: number }

export interface GymsRepository {
  findById(id: string): Promise<Gym | null>
  searchMany(query: string, page: number): Promise<Gym[]>
  create(data: Gym): Promise<Gym>
  findManyNearby(params: findManyNearbyProps): Promise<Gym[]>
}
