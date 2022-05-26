import { Module } from '@nestjs/common';
import { PhotoService } from './photo.service';
import { PhotoController } from './photo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Photo } from './photo.entity';
import { AlbumModule } from 'src/album/album.module';

@Module({
  imports: [TypeOrmModule.forFeature([Photo]), AlbumModule],
  controllers: [PhotoController],
  providers: [PhotoService],
})
export class PhotosModule {}
