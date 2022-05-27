import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Album } from "src/album/album.entity";
import { AlbumModule } from "src/album/album.module";
import { UserModule } from "src/user/user.module";
import { UserAlbumController } from "./user-album.controller";
import { UserAlbumService } from "./user-album.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([Album]),
    UserModule,
    AlbumModule
  ],
  controllers: [UserAlbumController],
  providers: [UserAlbumService],
})

export class UserAlbumModule {}