import { Controller, Get, HttpStatus, NotFoundException, Param, Put, Res, Body } from '@nestjs/common';
import { UserProfileDto } from './user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor (private readonly userService: UserService) {}

  @Get('/:userId/profile')
  public async getUser(
    @Res() res,
    @Param('userId') userId: string
  ): Promise<User> {
    const user = await this.userService.findById(userId);

    if(!user) {
      throw new NotFoundException('User does not exist!')
    }

    return res.status(HttpStatus.OK).json({
      user: user,
      status: 200,
    });
  }

  @Put('/:userId/profile')
  public async updateUserProfile(
    @Res() res,
    @Param('userId') userId: string,
    @Body() userProfileDto: UserProfileDto,
  ) {
    try {
      await this.userService.updateProfile(userId, userProfileDto);
      
      return res.status(HttpStatus.OK).json({
        message: 'User updated successfully!',
        status: 200,
      });
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error: User not updated!',
        status: 400,
      });
    }
  }
}
