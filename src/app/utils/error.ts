import { NextFunction } from "express"

function GenerateError({ message, code, errors = [] }: {message: string; code: number; errors?: any[]}) {
  const error: any = new Error(message)
  error.statusCode = code
  if (errors) {
    error.errors = errors
  }
  throw error
}

function CatchError(err: {statusCode?: number}, next: NextFunction) {
  if (!err.statusCode) {
    err.statusCode = 500
  }
  next(err)
}

export { GenerateError, CatchError }
