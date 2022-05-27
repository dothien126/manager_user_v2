import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "src/auth/auth.module";
import { UserModule } from "src/user/user.module";

import { PostController } from "./post.controller";
import { Post } from "./post.entity";
import { PostService } from "./post.service";

@Module({
  imports: [TypeOrmModule.forFeature([Post]), UserModule, AuthModule],
  controllers: [PostController],
  providers: [PostService],
  exports: [PostService]
})

export class PostModule {}