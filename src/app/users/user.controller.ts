import { Request, Response, NextFunction } from "express"
import { CatchError } from "../utils/error"
import { CreateUserDto } from "./dto/create-user.dto";
import { ForgetPasswordDto } from "./dto/forget-password.dto";
import { UserLoginDto } from "./dto/user-login.dto";
import UserService from "./user.service";

const userService = new UserService();

export default class UserController {
    /**
     * User Login
     * @param {body} email and password
     * @param res success | fail
     * @param next
     */
    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const userLoginDto: UserLoginDto = req.body;
            const { token, user } = await userService.login(userLoginDto);
            res.status(200).json({
                message: "logged in success",
                payload: { token, user },
                status: "success",
            })
        } catch (e) {
            CatchError(e, next)
        }
    }

  /**
   * Create New User -> Signup
   * @param {body}
   * @param res success | fail
   * @param next
   */
    async createUser(req: Request, res: Response, next: NextFunction) {
        try {
            const createUserDto: CreateUserDto = req.body;
            const { token, user } = await userService.createUser(createUserDto);
            res.status(201).json({ message: "user created", payload: { user, token }, status: "success" })
        } catch (err) {
            CatchError(err, next)
        }
    }
  
    /**
     * Forget Password
     * @param {body}
     * @param res success | fail
     * @param next
     */
    async forgetPassword(req: Request, res: Response, next: NextFunction) {
        try {
            const forgetPasswordDto: ForgetPasswordDto = req.body;
            const { otp } = await userService.forgetPassword(forgetPasswordDto);
            res.status(200).json({
                message: "otp send to your email.",
                payload: { id: otp.id },
                status: "success",
            })
        } catch (err) {
            CatchError(err, next)
        }
    }
}