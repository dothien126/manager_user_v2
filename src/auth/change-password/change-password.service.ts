import { MailerModule, MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { UserService } from "src/user/user.service";
import { ChangePasswordDto } from "./change-password.dto";

@Injectable()
export class ChangePasswordService {
  constructor(
    private readonly userService: UserService,
    private readonly mailerService: MailerService,
  ) {}

  public async changePassword(
    changePasswordDto: ChangePasswordDto,
  ): Promise<any> {
    this.sendMailChangePassword(changePasswordDto);
    
    return await this.userService.updateByPassword(
      changePasswordDto.email,
      changePasswordDto.password,
    )
  }

  private sendMailChangePassword(user): void {
    this.mailerService
      .sendMail({
        to: user.email,
        subject: 'Change Password successful ✔',
        text: 'Change Password successful!',
        context: {
          title: 'Change Password successful!',
          description:
            'Change Password Successfully! ✔, This is your new password: ' +
            user.password,
          nameUser: user.name,
        },
      })
      .then((response) => {
        console.log(response);
        console.log('Change Password: Send Mail successfully!');
      })
      .catch((err) => {
        console.log(err);
        console.log('Change Password: Send Mail Failed!');
      });
  }
}
