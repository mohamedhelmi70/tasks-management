//Business logic for OPT
import { OTP } from "../../../db"
import { CreateOTPDto } from "../dto/create-otp.dto";
import { IOtp } from "./otp.interface";

export default class OTPService {
  async createOTP (createOTPDto: CreateOTPDto): Promise<{otp: IOtp}> {
    try {
      const userOTP = await OTP.findOne({ where: {email: createOTPDto.email} });
      
      if (!userOTP) {
        const otp = await OTP.create(createOTPDto)
        //TODO: Send OTP WITH Email Service
        return { otp }
      }
      
      userOTP.code = createOTPDto.code;
      
      const result = await userOTP.save()
      
      //TODO: Send OTP WITH Email Service

      return { otp: result }
    } catch (error) {
      throw error
    }
  }
}
