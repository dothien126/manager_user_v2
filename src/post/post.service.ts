import { Injectable, NotFoundException } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { User } from "src/user/user.entity";
import { CreatePostDto, EditPostDto } from "./post.dto";
import { Post } from "./post.entity";
import { PostRepository } from "./post.repository";

@Injectable()
export class PostService {
  constructor(
    private postRepository: PostRepository,
    private commandBus: CommandBus,
  ) { }

  async createPost(dto: CreatePostDto, author: User): Promise<Post> {
    const post = this.postRepository.create({ ...dto, author });
    return await this.postRepository.save(post)
  }

  async getPostList(): Promise<Post[]> {
    return await this.postRepository.find()
  }

  async getPostById(id: string, author?: User): Promise<Post> {
    const post = await this.postRepository
      .findOne({ where: { id } })
      .then(p => (!author ? p : !!p && author.id === p.author.id ? p : null));

    if (!post) {
      throw new NotFoundException('Post does not exist or unauthorized')
    }

    return post;
  }

  async editPost(id: string, dto: EditPostDto, author?: User): Promise<Post> {
    const post = await this.getPostById(id, author);

    const editedPost = Object.assign(post, dto)

    return await this.postRepository.save(editedPost)
  }

  async deletePost(id: string, author?: User): Promise<any> {
    const post = await this.getPostById(id, author);

    return await this.postRepository.remove(post)
  }
}
