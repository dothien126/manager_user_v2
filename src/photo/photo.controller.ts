import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  Res,
  UploadedFile,
  Req,
} from '@nestjs/common';
import { Express } from 'express';
import { PhotoService } from './photo.service';
import { UpdatePhotoDto, CreatePhotoDto } from './photo.dto';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { editFileName, imageFileFilter } from 'src/share/upload-file/upload-file';
import { diskStorage } from 'multer';
import path from 'path';

@ApiTags('Photos')
@ApiBearerAuth()
@Controller('photos')
export class PhotoController {
  constructor(private readonly photoService: PhotoService) { }

  @Post(':albumId')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './images',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  public async create(
    @UploadedFile() file: Express.Multer.File,
    @Param('albumId') albumId: string,
    @Req() req,
    @Res() res,
  ) {
    const data: CreatePhotoDto = {
      name: req.body.name,
      link: file.path
    }
    const rs = await this.photoService.create(req.user, albumId, data);
    return res.json(rs);
  }



  @Get('/:albumId')
  public async findAllByAlbumId(@Param('albumId') albumId: string, @Res() res) {
    const rs = await this.photoService.findAllPhotoOfAlbum(albumId);
    return res.json({ rs });
  }
  @Get()
  public async findAll(@Req() req, @Res() res) {
    const rs = await this.photoService.findAll(req.user);
    return res.json({ rs });
  }

  @Get(':id')
  public async findOne(@Param('id') id: string, @Res() res) {
    const rs = await this.photoService.findOne(id);
    return res.json({ rs });

  }

  @Patch(':id')
  public async update(@Param('id') id: string, @Body() updatePhotoDto: UpdatePhotoDto) {
    return await this.photoService.update(id, updatePhotoDto);
  }

  @Delete(':id')
  public async remove(@Param('id') id: string) {
    return await this.photoService.delete(id);
  }
}
