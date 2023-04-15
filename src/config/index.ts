import * as dotenv from "dotenv"

dotenv.config()

export const dbConfig = {
  HOST: process.env.DB_HOST,
  USER: process.env.DB_USER,
  PASSWORD: process.env.DB_PASSWORD,
  DB: process.env.DB_NAME,
  dialect: "mysql",
  PORT: process.env.DB_PORT,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  dialectOptions: {
    supportBigNumbers: true,
    decimalNumbers: true,
    bigNumberStrings: false,
  },
}

// export const emailConfig = {
//   pool: true,
//   host: String(process.env.SMTP_HOST).trim(),
//   port: Number(process.env.SMTP_PORT),
//   secure: true, // true for port 465, false for other ports
//   auth: {
//     user: String(process.env.SMTP_USERNAME).trim(),
//     pass: String(process.env.SMTP_PASSWORD).trim(),
//   },
// }

export const jwtConfig = {
  SECRETKEY: process.env.SECRETKEY,
}

export const appConfig = {
  env: process.env.NODE_ENV,
  port: Number(process.env.PORT) || 3000,
}