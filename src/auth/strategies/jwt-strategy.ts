import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import * as config from 'config'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { AuthPayload } from "../interfaces/auth-payload.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.jwt.secret,
    });
  }

  async validate(payload: AuthPayload) {
    return {
      id: payload.id,
      userNam: payload.userName,
      email: payload.email,
    }
  }
}


