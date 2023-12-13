export type CheckIn = {
  id?: string
  created_at?: Date | string
  validated_at?: Date | string | null
  user_id: string
  gym_id: string
}

export interface CheckInsRepository {
  create(data: CheckIn): Promise<CheckIn>
  save(checkIn: CheckIn): Promise<CheckIn>
  findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null>
  findManyByUserId(userId: string, page?: number): Promise<CheckIn[]>
  countByUserId(userId: string): Promise<number>
  findById(checkInId: string): Promise<CheckIn | null>
}
