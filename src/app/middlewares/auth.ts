import jwt from "jsonwebtoken"
import { Request, Response, NextFunction } from "express"
import { User } from "../../db"
import { jwtConfig } from "../../config"

export function isAuth(req: Request, res: Response, next: NextFunction) {
  authorization(req.get("Authorization"))
    .then((data: any) => {
      req.userId = data.userId
      next()
    })
    .catch((err) => {
      res.status(401).json({ message: err, errors: [] })
    })
}

function authorization(bearerToken: string) {
  return new Promise(async (resolve, reject) => {
    try {
      if (!bearerToken) {
        reject("Not authorized.!!")
      }
      const token = bearerToken.split(" ")[1]
      let decodedToken: any
      try {
        decodedToken = jwt.verify(token, jwtConfig.SECRETKEY)
      } catch (e) {
        reject("Not authorized.!")
      }
      if (!decodedToken) {
        reject("Not authorized.!")
      }
      User.findByPk(decodedToken.userId, { attributes: ["id", "status"] })
        .then((user) => {
          if (user.status != "ACTIVE") {
            reject("Your account is unavailable.!")
          } 
          resolve(decodedToken)
        })
        .catch(() => {
          reject("Error in get your account.!")
        })
    } catch (err) {
      reject("Not authorized.!")
    }
  })
}
