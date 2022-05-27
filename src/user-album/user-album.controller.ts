import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { Album } from 'src/album/album.entity';
import { AlbumService } from 'src/album/album.service';
import { InviteToAlbum } from './dto/invite-album.dto';
import { UserAlbumService } from './user-album.service';

@Controller('user-album')
export class UserAlbumController {
  constructor(
    private readonly userAlbumService: UserAlbumService,
    private readonly albumService: AlbumService
  ) {}

  @Post('invite-to-album')
  async inviteToAlbum(@Body() data: InviteToAlbum, @Req() req) {
    return await this.userAlbumService.invite(data);
  }

  @Get('handle/:token')
  async handleInvite(@Param('token') token: string) {
    return await this.albumService.handleInvite(token);
  }
}
