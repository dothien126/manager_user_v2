import { Body, Controller, Delete, Get, Injectable, Param, Post, Put } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { InjectRolesBuilder, RolesBuilder } from "nest-access-control";
import { AppResource } from "src/app.roles";
import { Auth } from "src/share/decorators/auth.decorator";
import { GetUser } from "src/share/decorators/get-user.decorator";
import { User } from "src/user/user.entity";
import { CreatePostDto, EditPostDto } from "./post.dto";
import { PostService } from "./post.service";

@ApiTags('Post')
@Controller('post')
export class PostController {
  constructor(
    private readonly postService: PostService,
    @InjectRolesBuilder()
    private readonly roleBuilder: RolesBuilder,
  ) { }

  @Get()
  async getPostList() {
    const data = await this.postService.getPostList();

    return { data };
  }

  @Get(':id')
  async getPostById(@Param('id') id: string) {
    const data = await this.postService.getPostById(id);

    return { data };
  }

  @Post()
  async createPost(@Body() dto: CreatePostDto, @GetUser() author: User) {
    const data = await this.postService.createPost(dto, author)

    return { message: 'Post created!', data }
  }

  @Auth({
    resource: AppResource.POST,
    action: 'create',
    possession: 'own'
  })
  @Put(':id')
  async editPost(
    @Param('id') id: string,
    @Body() dto: EditPostDto,
    @GetUser() author: User,
  ) {
    let data: any;

    if (
      this.roleBuilder.can(author.role).updateAny(AppResource.POST).granted
    ) {
      // edit - update any post
      data = await this.postService.editPost(id, dto)
    } else {
      // edit - update a post
      data = await this.postService.editPost(id, dto, author);
    }

    return { message: 'Post edited', data }
  }

  @Auth({
    resource: AppResource.POST,
    action: 'delete',
    possession: 'own',
  })
  @Delete(':id')
  async deletePost(
    @Param('id') id: string,
     @GetUser() author: User,
    ) {
    let data: any;

    if (
      this.roleBuilder.can(author.role).deleteAny(AppResource.POST).granted
    ) {
      data = await this.postService.deletePost(id);
    } else {
      data = await this.postService.deletePost(id, author);
    }

    return { message: 'Post deleted', data };
  }
}
