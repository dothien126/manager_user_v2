import { MailerModule } from "@nestjs-modules/mailer";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/user/user.entity";
import { UserService } from "src/user/user.service";
import { ChangePasswordController } from "./change-password.controller";
import { ChangePasswordService } from "./change-password.service";

@Module({
  imports: [TypeOrmModule.forFeature([User]), MailerModule],
  controllers: [ChangePasswordController],
  providers: [ChangePasswordService, UserService]
})

export class ChangePasswordModule {}
