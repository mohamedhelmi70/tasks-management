export interface IUser {
  readonly id: string
  authorize: number | boolean
  email: string
  name: string
  password: string
  status: UserStatus
  createdAt?: Date
  updatedAt?: Date
  reference: number
}

export enum UserStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  BLOCKED = "BLOCKED",
  DELETED = "DELETED",
}