import { ApiProperty, PartialType, OmitType } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreatePostDto {
  @ApiProperty()
  @IsString()
  @MinLength(5)
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  content: string;
}

export class EditPostDto {
  @ApiProperty()
  @IsString()
  @MinLength(5)
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  content: string;
}

