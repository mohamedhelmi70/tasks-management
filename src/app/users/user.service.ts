//Business logic for all user routes
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import { GenerateError } from "../utils/error"
import { User } from "../../db"
import MainProvider from "../../index.provider"
import { jwtConfig } from "../../config"
import { UserLoginDto } from "./dto/user-login.dto"
import { CreateUserDto } from "./dto/create-user.dto"

export default class UserProvider extends MainProvider {
  constructor() {
    super("user")
  }

  async login(loginUserDto: UserLoginDto) {
    const user = await User.findOne({ where: { email : loginUserDto.email } })
    
    if (!user) {
      GenerateError({ message: 'user not found', code: 404 })
    }

    const isEqual = await bcrypt.compare(loginUserDto.password, user.password)
    
    if (!isEqual) {
      GenerateError({ message: 'wronge password', code: 404 })
    }
  
    const token = jwt.sign({ email: user.email, userId: user.id }, jwtConfig.SECRETKEY, {
      expiresIn: "3d",
    })

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        authorize: user.authorize,
      },
    }
  }

  async createUser(createUserDto: CreateUserDto) {
    const hashedPw = await bcrypt.hash(createUserDto.password, 12)
    const userCreated = await User.create({
      name: createUserDto.name,
      email: createUserDto.email,
      password: hashedPw,
    })

    const token = jwt.sign({ email: userCreated.email, userId: userCreated.id }, jwtConfig.SECRETKEY, {
      expiresIn: "3d",
    })
    
    return {
      token,
      user: {
        id: userCreated.id,
        name: userCreated.name,
        email: userCreated.email,
        createdAt: userCreated.createdAt,
        authorize: userCreated.authorize,
      },
    }
  }
}