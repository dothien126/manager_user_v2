import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({example: "it's comment"})
  @IsString()
  @MaxLength(300)
  content: string;
}

export class UpdateCommentDto {
  @ApiProperty({example: "it's comment"})
  @IsString()
  @MaxLength(300)
  content: string;
}
