import { Body, Controller, HttpStatus, Post, Res, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { JwtGuard } from "../guards/jwt.guard";
import { ChangePasswordDto } from "./change-password.dto";
import { ChangePasswordService } from "./change-password.service";

@ApiTags('Auth')
@UseGuards(JwtGuard)
@Controller('change-password')
export class ChangePasswordController {
  constructor(private readonly changePasswordService: ChangePasswordService) {}

  @Post()
  public async changePassword(
    @Res() res,
    @Body() changePasswordDto: ChangePasswordDto,
  ) {
    try {
      await this.changePasswordService.changePassword(changePasswordDto)

      return res.status(HttpStatus.OK).json({
        message: 'Request Change Password Successfully!',
        status: 200,
      })
    } catch (err) {
      
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error: Change password failed!',
        status: 400
      })
    }
  }
}

