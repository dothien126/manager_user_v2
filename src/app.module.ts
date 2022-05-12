import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AlbumModule } from './album/album.module';
import { PhotoModule } from './photo/photo.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/ormconfig';
import * as Joi from '@hapi/joi';
import { ConfigModule } from '@nestjs/config';
import { UserAlbum } from './user-album/user-album.entity';

@Module({
  imports: [
    UserModule,
    AlbumModule,
    PhotoModule,
    AuthModule,
    UserAlbum,
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
        PORT: Joi.number(),
      }),
    }),
    DatabaseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
