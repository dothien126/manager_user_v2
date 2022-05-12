import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AlbumModule } from './album/album.module';
import { PhotoModule } from './photo/photo.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UserModule, AlbumModule, PhotoModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
