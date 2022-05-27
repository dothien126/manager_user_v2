import {
  Controller,
  Get,
  HttpStatus,
  Param,
  Put,
  Res,
  Body,
  Post,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBasicAuth, ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { GetUser } from 'src/share/decorators/get-user.decorator';
import { UpdateUserDto, UserProfileDto } from './user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiBasicAuth('JWT-auth')
  @UseGuards(AuthGuard('jwt'))
  @Get('/profile')
  async getUser(@GetUser() user): Promise<User> {
    return this.userService.getMe(user.id);
  }

  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuard('jwt'))
  @Patch('/update')
  async updateUserProfile(@GetUser() user, @Body() data: UpdateUserDto) {
    await this.userService.edit(user.id, data);

    return {
      success: true,
    };
  }

  // @Post('avatar')
  // @UseInterceptors(
  //   FileInterceptor('image', {
  //     storage: diskStorage({
  //       destination: './files',
  //       filename: editFileName,
  //     }),
  //     fileFilter: imageFileFilter,
  //   }),
  // )
  // async uploadedFile(@UploadedFile() file, @Body() body) {
  //   const response = {
  //     body,
  //     originalname: file.originalname,
  //     filename: file.filename,
  //   };
  //   return response;
  // }
}
