import { MailerModule } from "@nestjs-modules/mailer";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/user/user.entity";
import { UserService } from "src/user/user.service";
import { ForgotPasswordDto } from "./forgot-password.dto";
import { ForgotPasswordService } from "./forgot-password.service";

@Module({
  imports: [TypeOrmModule.forFeature([User]), MailerModule],
  providers: [ForgotPasswordService, UserService],
  controllers: [ForgotPasswordController],
})

export class ForgotPasswordModule {}
