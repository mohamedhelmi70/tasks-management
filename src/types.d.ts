export {};

declare global {
  namespace Express {
    interface Request {
      userId?: number
      lang?: lang
    }
  }
  type lang = "en"
}
