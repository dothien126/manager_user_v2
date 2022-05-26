import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostModule } from 'src/post/post.module';
import { CommentService } from './comment.service';
import { Comment } from './comment.entity'
import { CommentController } from './comment.controller';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Comment]), PostModule, UserModule],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
