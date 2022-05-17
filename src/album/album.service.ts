import { Injectable } from '@nestjs/common';
import { Album } from './album.entity';
import { ALbumRepository } from './album.repository';
import { AlbumNotFoundException } from './exceptions/album-not-found.exception';

@Injectable()
export class AlbumService {
  constructor(
    private readonly albumRepository: ALbumRepository,
  ) {}

  async getAlbum(id: string): Promise<Album> {
    const queryBuilder = this.albumRepository
      .createQueryBuilder('album')
      .where('album.id = :id', {id})

    const albumEntity = await queryBuilder.getOne();
    if(!albumEntity) {
      throw new AlbumNotFoundException()
    }

    return albumEntity;
  }
}
