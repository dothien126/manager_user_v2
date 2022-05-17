import { Body, Controller, HttpStatus, Post, Res } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ForgotPasswordDto } from "./forgot-password.dto";
import { ForgotPasswordService } from "./forgot-password.service";

@ApiTags('Auth')
@Controller('forgot-password')
export class ForgotPasswordController {
  constructor (private readonly forgotPasswordService: ForgotPasswordService) {}

  @Post()
  public async forgotPassword(
    @Res() res,
    @Body() email: string,
  ): Promise<any> {
    try {
      await this.forgotPasswordService.forgotPassword(email);

      return res.status(HttpStatus.OK).json({
        message: 'Request Reset Password Successfully!',
        status: 200,
      })
    } catch (err) {

      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error: Forgot password failed!',
        status: 400,
      })
    }
  }
}