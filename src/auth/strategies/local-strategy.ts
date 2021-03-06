import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'userName',
    });
  }

  async validate(userName: string, password: string): Promise<any> {
    const user = await this.authService.authentication(userName, password);
    if (!user) {
      throw new UnauthorizedException(`Hmm, Don't do that`);
    }

    return user;
  }
}