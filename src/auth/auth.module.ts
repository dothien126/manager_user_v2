import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MailModule } from 'src/share/mailer/mailer.module';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    UserModule,
    MailModule,
    JwtModule.regi
  ]
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
