import { Body, Controller, HttpException, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/share/decorators/get-user.decorator';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { CredentialsDto } from './dto/credential.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor (
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('register')
  async register(@Body() user: CreateUserDto) {
    const isEmailValid = await this.userService.findByEmail(user.email);
    if(isEmailValid) {
      throw new HttpException(
        'Email is '
      )
    }
  }

  @Post('login')
  async login(@GetUser() user, @Body() credential: CredentialsDto) {
    
    return this.authService.login(user)
  }
}
