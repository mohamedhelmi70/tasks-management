export {};

declare global {
  namespace Express {
    interface Request {
      userId?: string;
      lang?: lang
    }
  }
  type lang = "en"
}
