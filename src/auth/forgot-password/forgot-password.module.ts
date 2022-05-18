import { MailerModule } from "@nestjs-modules/mailer";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/user/user.entity";
import { UserModule } from "src/user/user.module";
import { ForgotPasswordController } from "./forgot-password.controller";
import { ForgotPasswordService } from "./forgot-password.service";

@Module({
  imports: [TypeOrmModule.forFeature([User]), MailerModule, UserModule],
  controllers: [ForgotPasswordController],
  providers: [ForgotPasswordService]
})

export class ForgotPasswordModule {}
