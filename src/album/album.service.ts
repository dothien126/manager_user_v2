import { MailerService } from '@nestjs-modules/mailer';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { use } from 'passport';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { CreateAlbumDto, InviteToAlbum, UpdateAlbumDto } from './album.dto';
import { Album } from './album.entity';
import { AlbumNotFoundException } from './exceptions/album-not-found.exception';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(Album)
    private readonly albumRepository: Repository<Album>,
    private readonly userService: UserService,
    private readonly mailerService: MailerService,
    private readonly jwtService: JwtService
  ) {}

  async createAlbum(data: CreateAlbumDto, user: User): Promise<Album> {
    try {
      const album = new Album();
      album.name = data.name;
      album.ownerId = user.id;
      album.description = data.description;
      album.userAlbum = [];
      album.userAlbum.push(user);
      return await this.albumRepository.save(album);
    } catch (error) {
      throw new Error();
    }
  }

  async findAll(user: User): Promise<Album[]> {
    try {
      const albumList = await this.albumRepository.find({
        select: ['id', 'name', 'description'],
        where: { ownerId: user.id },
      });
      return albumList;
    } catch (error) {
      throw new Error();
    }
  }

  async findOne(id: string): Promise<Album> {
    try {
      return await this.albumRepository.findOne({ where: { id }, relations: ['userAlbum'] });
    } catch (error) {
      throw new Error();
    }
  }

  async findById(id: string): Promise<Album> {
    try {
      return await this.albumRepository.findOne({ where: { id } });
    } catch (error) {
      throw new Error();
    }
  }

  async update(id: string, data: UpdateAlbumDto): Promise<Album> {
    try {
      const album = await this.findOne(id);
      album.name = data.name;
      album.description = data.description;
      return await this.albumRepository.save(album);
    } catch (error) {
      throw new Error();
    }
  }

  async delete(id: string) {
    try {
      return this.albumRepository.delete(id);
    } catch (error) {
      throw new Error();
    }
  }

  async invite(data: InviteToAlbum) {
    try {
      const user = await this.userService.findByEmail(data.email);
      if (!user) {
        return new NotFoundException('User email not found!');
      }

      const album = await this.findOne(data.albumId);
      if (!album) {
        return new NotFoundException('Email dose not exist!');
      }

      const payload = {
        email: data.email,
        albumId: data.albumId,
      };
      const inviteToken = this.jwtService.sign(payload);
      const link = `localhost:3000/album/handle/${inviteToken}`;
      this.sendMailInvite(data.email, link);
      return;
    } catch (error) {
      return new Error(error);
    }
  }

  private sendMailInvite(user, link): void {
    this.mailerService
      .sendMail({
        to: user.email,
        from: 'from@example.com',
        subject: 'Invite to Album',
        text: 'Invite to Album!',
        template: 'index',
        context: {
          title: 'Invite to Album',
          link,
          description: `In order to complete registration please click Invite`,
        },
      })
      .then(() => {
        console.log('Invite User: Send Mail Invite successfully!');
      })
      .catch(() => {
        console.log('Invite User: Send Mail Invite Failed!');
      });
  }

  async getAlbumJoin(user: User): Promise<Album[]> {
    const album = await this.albumRepository
      .createQueryBuilder()
      .leftJoinAndSelect('Album.userAlbum', 'User')
      .where('User.id = :id', { id: user.id })
      .getMany();
    return album;
  }

  async handleInvite(token: string) {
    try {
      const {email, albumId} = this.jwtService.verify(token);
      const user = await this.userService.findByEmail(email);
      const album = await this.findOne(albumId);
      album.userAlbum.push(user);
      return await this.albumRepository.save(album)
    } catch (error) {
      throw new Error(error)
    }
  }
}
