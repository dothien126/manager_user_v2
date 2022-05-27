import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { CreateAlbumDto, InviteToAlbum, UpdateAlbumDto } from './album.dto';
import { AlbumService } from './album.service';

@Controller('album')
@ApiTags('Album')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Post()
  create(@Body() data: CreateAlbumDto, @Req() req) {
    return this.albumService.createAlbum(data, req.user);
  }

  @Get()
  findAll(@Req() req) {
    return this.albumService.findAll(req.user);
  }

  @Get('all')
  findAlbumJoined(@Req() req) {
    return this.albumService.getAlbumJoin(req.user);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.albumService.findOne(id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdateAlbumDto) {
    return this.albumService.update(id, data)
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.albumService.delete(id)
  }

  @Post('invite-to-album')
  async inviteToAlbum(@Body() data: InviteToAlbum, @Req() req) {
    return await this.albumService.invite(data)
  }

  @Get('handle/:token')
  async handleInvite(@Param('token') token: string) {
    return await this.albumService.handleInvite(token)
  }
}
