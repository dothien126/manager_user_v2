import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportStrategy } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import * as config from 'config';
import { UserRepository } from 'src/repositories/user.repository';
import { jwtConstants } from 'src/share/constants/jwt.constant';
import { MailModule } from 'src/share/mailer/mailer.module';
import { User } from 'src/user/user.entity';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt-strategy';
import { LocalStrategy } from './strategies/local-strategy';

@Module({
  imports: [
    UserModule,
    MailModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: {
        expiresIn: process.env.EXPIRES_TIME,
      },
    }),
    TypeOrmModule.forFeature([User])
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
