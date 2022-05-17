import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MailService } from 'src/share/mailer/mailer.service';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt'
import { AuthPayload } from './interfaces/auth-payload.interface';
import { User } from 'src/user/user.entity';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userSerive: UserService,
    private readonly mailService: MailService,
  ) {}

  async hashPassword(password: string): Promise<string> {
    const saltOrRounds = 10;
    return await bcrypt.hash(password, saltOrRounds)
  }

  async  comparePassword(
    password: string,
    hashPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashPassword)
  }

  async authentication(
    userName: string,
    password: string,
  ): Promise<User | false> {
    const user = await this.userSerive.findByUserName(userName);
    const check = await this.comparePassword(password, user.password);
    if(!user || !check) {
      return false;
    }

    return user;
  }

  async mailAuhthenticateUser(user: User) {
    const payload: AuthPayload = {
      id: user.id,
      userName: user.userName,
      email: user.email,
    };
    const token = this.jwtService.sign(payload, { expiresIn: '30m' });
    const content = `Click this link to active your account:\n ${process.env.FE_URl}/verify/${token}`;
    try {
      this.mailService.sendMail(user.email, content);
    } catch (error) {
      throw new BadRequestException('Email is not exist!');
    }
  }

  async login(user: User) {
    const payload: AuthPayload = {
      id: user.id,
      userName: user.userName,
      email: user.email,
    }

    return {
      accessToken: this.jwtService.sign(payload),
      user: {...payload},
    };
  }

  async forgotPassword(email: string) :Promise<void> {
    const user = await this.userSerive.findByEmail(email)
    if(!user) {
      throw new BadRequestException('Email is not exist!')
    }

    
  } 
}
