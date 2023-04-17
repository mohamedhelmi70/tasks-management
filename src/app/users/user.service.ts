//Business logic for all user routes
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import { GenerateError } from "../utils/error"
import { User } from "../../db"
import MainProvider from "../../index.provider"
import { jwtConfig } from "../../config"
import { UserLoginDto } from "./dto/user-login.dto"
import { CreateUserDto } from "./dto/create-user.dto"
import OTPService from "./otps/otp.service"
import { ForgetPasswordDto } from "./dto/forget-password.dto"
import { IOtp } from "./otps/otp.interface"
import { CreateOTPDto } from "./dto/create-otp.dto"

export default class UserProvider extends MainProvider {
  otpService: OTPService;
  constructor() {
    super("user");
    this.otpService = new OTPService();
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

  async forgetPassword (forgetPasswordDto: ForgetPasswordDto): Promise<{otp: IOtp}> {
    try {
      const createOTPDto: CreateOTPDto = new CreateOTPDto();
      createOTPDto.email = forgetPasswordDto.email;

      //Generate Random Code with fixed length: 4
      createOTPDto.code = this.genrateCode();

      const { otp } = await this.otpService.createOTP(createOTPDto);
      
      return { otp: otp }
    } catch (error) {
      throw error;
    }
  }

  private genrateCode () {
    return Math.floor(1000 + Math.random() * 9000)
  }
}