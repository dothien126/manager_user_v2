import { BadRequestException, Body, Controller, Get, HttpException, HttpStatus, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/share/decorators/get-user.decorator';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { CredentialsDto } from './dto/credential.dto';
import { EmailDto } from './dto/mail.dto';
import { JwtGuard } from './guards/jwt.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) { }

  @Post('register')
  async register(@Body() user: CreateUserDto) {
    const isUsernameValid = await this.userService.findByUserName(user.userName);
    if (isUsernameValid) {
      throw new HttpException(
        'Username is already existed!',
        HttpStatus.BAD_REQUEST,
      )
    }

    const isEmailValid = await this.userService.findByEmail(user.email);
    if (isEmailValid) {
      throw new HttpException(
        'Email is already existed!',
        HttpStatus.BAD_REQUEST,
      )
    }

    user.password = await this.authService.hashPassword(user.password);
    const newUser = await this.userService.create(user);
    await this.authService.mailAuhthenticateUser(newUser);

    return {
      success: true,
      message:
        'Register successfully, please active your account by verify email'
    }
  }

  @Post('reactive')
  async reactive(@Body() email: EmailDto) {
    const user = await this.userService.findByEmail(email.email)
    if(!user || user.status) {
      throw new BadRequestException(`Email doesn't exist or already active!`)
    }

    this.authService.mailAuhthenticateUser(user);

    return {
      success: true,
      message: 'Please active account by verify email'
    }
  }

  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtGuard)
  @Get('verify')
  async verifyAccount(@GetUser() user) {
    await this.userService.activeAccount(user.id)

    return {
      success: true,
    }
  }

  @Post('login')
  async login(@GetUser() user, @Body() credential: CredentialsDto) {

    return this.authService.login(user)
  }

  @Patch('change-password')
  async changePassword() {}
}
