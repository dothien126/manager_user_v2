import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AlbumModule } from './album/album.module';
import { PhotoModule } from './photo/photo.module';
import { AuthModule } from './auth/auth.module';
import { typeOrmOptions } from './configs/database.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostModule } from './post/post.module';

@Module({
  imports: [
    UserModule,
    AlbumModule,
    PhotoModule,
    AuthModule,
    // PostModule,
    TypeOrmModule.forRootAsync(typeOrmOptions),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
