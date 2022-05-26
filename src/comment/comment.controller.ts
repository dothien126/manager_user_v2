import { Body, Controller, Delete, Get, Param, Patch, Post, Req } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { UpdateAlbumDto } from "src/album/album.dto";
import { CreateCommentDto, UpdateCommentDto } from "./comment.dto";
import { CommentService } from "./comment.service";

@Controller('comment')
@ApiTags('Comment')
@ApiBearerAuth()
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post(':postId')
  public async createComment(
    @Param('albumId') albumId: string,
    @Body() data: CreateCommentDto,
    @Req() req, 
  ) {
    const rs = await this.commentService.createComment(req.user, albumId, data)
    return rs
  }

  @Get(':id')
  async getCommentById(@Param('id') id: string) {
    return await this.commentService.findCommentById(id)
  }

  @Get(':userId')
  async getAllCommentOfUser(@Param('userId') userId: string) {
    return await this.commentService.findAllCommentOfUser(userId)
  }

  @Get(':postId')
  async getAllCommentOfPost(@Param('postId') postId: string) {
    return await this.commentService.findAllCommentOfPost(postId)
  }

  @Patch(':id')
  async updateComment(@Param('id') id: string, @Body() data: UpdateCommentDto) {
    return await this.commentService.updateComment(id, data)
  }

  @Delete(':id')
  async deleteComment(@Param(':id') id: string) {
    return await this.commentService.deleleComment(id)
  }
}