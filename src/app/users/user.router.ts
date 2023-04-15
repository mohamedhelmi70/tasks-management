import { Router } from "express"
import { body } from "express-validator"
import UserController from "./user.controller"
import { User } from "../../db"
import validateFields from "../middlewares/validate-fields"

export default class UserRouter {
  router: Router
  private userController = new UserController()

  constructor() {
    this.router = Router()
    this.routes()
  }

  private routes() {
    //POST - Login.
    this.router.post("/login", this.validator("login"), validateFields, this.userController.login)
    //POST - Signup.
    this.router.post("/signup", this.validator("createUser"), validateFields, this.userController.createUser)
    //POST - Forget Password.
    this.router.post("/forget-password", this.validator("forgetPassword"), validateFields, this.userController.forgetPassword)
  }

  private validator(route: string) {
    if (route == "login") {
      return [
        body("email")
          .trim()
          .notEmpty()
          .isEmail()
          .custom(async (value) => {
            const userDoc = await User.findOne({where: { email: value }})
            if (!userDoc) {
              return Promise.reject('User Not Found')
            }
          }),
        body("password").trim().notEmpty().isLength({ min: 5, max: 25 }),
      ]
    }  else if (route == "createUser") {
      return [
        body("name").trim().notEmpty().isLength({ min: 5 }),
        body("password").trim().notEmpty().isLength({ min: 5, max: 25 }),
        body("email")
          .trim()
          .notEmpty()
          .isEmail()
          .custom(async (value) => {
            const userDoc = await User.findOne({ where: { email: value } })
            if (userDoc) {
              return Promise.reject('email is exist actually.')
            }
          }),
      ]
    } else if (route == "forgetPassword") {
      return [
        body("email")
          .trim()
          .notEmpty()
          .isEmail()
          .custom(async (value) => {
            const userDoc = await User.findOne({ where: { email: value } })
            if (!userDoc) {
              return Promise.reject("email is not exists.!")
            }
          }),
      ]
    }
  }
}