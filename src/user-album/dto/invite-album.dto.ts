import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class InviteToAlbum {
  @ApiProperty({ example: 'abc@gmail.com' })
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({ example: 'AlbumId' })
  @IsString()
  @IsNotEmpty()
  readonly albumId: string;
}
