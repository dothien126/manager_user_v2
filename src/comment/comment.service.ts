import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { urlToHttpOptions } from 'http';
import { PostService } from 'src/post/post.service';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { CreateCommentDto, UpdateCommentDto } from './comment.dto';
import { Comment } from './comment.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    private readonly userService: UserService,
    private readonly postService: PostService
  ) {}

  async createComment(user: User, postId: string, data: CreateCommentDto): Promise<Comment> {
    const post = await this.postService.getPostById(postId);
    if (!post) {
      throw new Error('Hmm. No post no comment!');
    }

    const comment = new Comment();
    comment.content = data.content;
    comment.post = post;
    comment.user = user;

    return await this.commentRepository.save(comment);
  }

  async findCommentById(id: string): Promise<Comment> {
    return await this.commentRepository.findOne({ where: { id } });
  }

  async findAllCommentOfUser(userId: string): Promise<Comment[]> {
    const user = await this.userService.findById(userId);
    return await this.commentRepository.find({
      select: ['id', 'content', 'createdAt'],
      where: { user: user },
    });
  }

  async findAllCommentOfPost(postId: string): Promise<Comment[]> {
    const post = await this.postService.getPostById(postId);
    return await this.commentRepository.find({
      select: ['id', 'content', 'createdAt'],
      where: { post: post },
    });
  }

  async updateComment(id: string, data: UpdateCommentDto): Promise<Comment> {
    const comment = await this.commentRepository.findOne({ where: { id } });
    comment.content = data.content;
    return await this.commentRepository.save(comment);
  }

  async deleleComment(id: string): Promise<void> {
    const queryBuilder = this.commentRepository
      .createQueryBuilder('comment')
      .where('comment.id = :id', { id });

    const comment = await queryBuilder.getOne();
    if(!comment) {
      throw new NotFoundException('Hmm! Comment does not exist!')
    }

    await this.commentRepository.remove(comment);
  }
}
