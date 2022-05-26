import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AlbumService } from 'src/album/album.service';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { Photo } from './photo.entity';
import * as fs from 'fs';
import { UpdatePhotoDto } from './photo.dto';
@Injectable()
export class PhotoService {
  constructor(
    @InjectRepository(Photo)
    private readonly photoRepository: Repository<Photo>,
    private readonly albumService: AlbumService
  ) {}
  async create(user: User, albumId, data) {
    try {
      const album = await this.albumService.findById(albumId);
      if (!album) {
        return new Error('Album does not exist');
      }
      const photo = new Photo();
      photo.name = data.name;
      photo.link = data.link;
      photo.album = album;
      photo.user = user;
      return await this.photoRepository.save(photo);
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll(user: User): Promise<Photo[]> {
    try {
      return await this.photoRepository.find({
        select: ['id', 'name', 'link'],
        where: { user: user },
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAllPhotoOfAlbum(albumId: string): Promise<Photo[]> {
    try {
      const album = await this.albumService.findById(albumId);
      return await this.photoRepository.find({
        select: ['id', 'name', 'link'],
        where: { album: album },
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async findOne(id: string) {
    return await this.photoRepository.findOne({ where: { id } });
  }

  async update(id: string, data: UpdatePhotoDto) {
    const photo = await this.photoRepository.findOne({ where: { id } });
    photo.name = data.name;
    return await this.photoRepository.save(photo);
  }

  async delete(id: string) {
    const photo = await this.photoRepository.findOne({ where: { id } });
    await fs.unlink(photo.link, (err) => {
      if (err) {
        console.error(err);
        throw err;
      }
    });
    return await this.photoRepository.delete(photo);
  }
}
