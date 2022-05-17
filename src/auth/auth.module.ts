import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import * as config from 'config';
import { MailModule } from 'src/share/mailer/mailer.module';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ChangePasswordModule } from './change-password/change-password.module';
import { ForgotPasswordModule } from './forgot-password/forgot-password.module';
;

@Module({
  imports: [
    UserModule,
    MailModule,
    JwtModule.register({
      secret: config.jwt?.secret,
      signOptions: {
        expiresIn: config.jwt?.expiresTime,
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
