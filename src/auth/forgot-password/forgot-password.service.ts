import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/user/user.entity";
import { Repository } from "typeorm";
import { ForgotPasswordDto } from "./forgot-password.dto";
import * as bcrypt from 'bcrypt'
import { UserService } from "src/user/user.service";
import { AuthService } from "../auth.service";

@Injectable()
export class ForgotPasswordService {
  constructor(
    @InjectRepository(User)
    private readonly mailerService: MailerService,
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  public async forgotPassword(
    email: string,
  ): Promise<any> {
    const userUpdate = await this.userService.findByEmail(email);

    const passwordRand = Math.random().toString(36).slice(-8);
    userUpdate.password = bcrypt.hashSync(passwordRand, 8)

    
  }

  private passwordRand(password: string): string {
    const passwordRand = Math.random().toString(36).slice(-8);

    password = bcrypt.hashSync(passwordRand, 8);

    return password;
  }

  private sendMailForgotPassword(email: string, password: string): void {
    this.mailerService
      .sendMail({
        to: email,
        from: 'from@example.com',
        subject: 'Forgot Password successful ✔',
        text: 'Forgot Password successful!',
        template: 'index',
        context: {
          title: 'Forgot Password successful!',
          description:
           'Request Reset Password Successfully!  ✔, This is your new password: ' +
            password,
        },
      })
      .then((response) => {
        console.log(response);
        console.log('Forgot Password: Send Mail successfully!');
      })
      .catch((err) => {
        console.log(err);
        console.log('Forgot Password: Send Mail Failed!');
      });
  } 
}
