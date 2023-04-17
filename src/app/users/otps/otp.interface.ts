export interface IOtp {
  readonly id: string
  email: string;
  used?: number | boolean;
  code: number;
  expiresIn?: Date;
  updatedAt?: Date
}
