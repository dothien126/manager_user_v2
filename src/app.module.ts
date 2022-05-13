import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AlbumModule } from './album/album.module';
import { PhotoModule } from './photo/photo.module';
import { AuthModule } from './auth/auth.module';
import { typeOrmOptions } from './configs/database.config';
import * as Joi from '@hapi/joi';
import { ConfigModule } from '@nestjs/config';
import { UserAlbum } from './user-album/user-album.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    UserModule,
    AlbumModule,
    PhotoModule,
    AuthModule,
    UserAlbum,
    TypeOrmModule.forRootAsync(typeOrmOptions),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
