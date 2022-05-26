import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { AlbumController } from './album.controller';
import { Album } from './album.entity';
import { AlbumService } from './album.service';

@Module({
  imports: [TypeOrmModule.forFeature([Album]), 
  MailerModule,
  UserModule,
  JwtModule,
],
  controllers: [AlbumController],
  providers: [AlbumService],
  exports: [AlbumService],
})
export class AlbumModule {}
