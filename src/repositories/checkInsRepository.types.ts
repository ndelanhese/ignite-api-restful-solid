export type CheckIn = {
  id?: string
  created_at?: Date | string
  validated_at?: Date | string | null
  user_id: string
  gym_id: string
}

export interface CheckInsRepository {
  create(data: CheckIn): Promise<CheckIn>
}
