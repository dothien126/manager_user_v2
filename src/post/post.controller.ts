import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { GetUser } from "src/share/decorators/get-user.decorator";
import { User } from "src/user/user.entity";
import { CreatePostDto, EditPostDto } from "./post.dto";
import { PostService } from "./post.service";

@ApiTags('Post')
@Controller('post')
export class PostController {
  constructor(
    private readonly postSerive: PostService,
  
  ) { }

  @Get()
  async getPostList() {
    const data = await this.postSerive.getPostList();

    return { data };
  }

  @Get(':id')
  async getPostById(@Param('id') id: string) {
    const data = await this.postSerive.getPostById(id);

    return { data };
  }

  @Post()
  async createPost(@Body() dto: CreatePostDto, @GetUser() author: User) {
    const data = await this.postSerive.createPost(dto, author)

    return { message: 'Post created!', data }
  }

}
