import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateAlbumDto {
  @ApiProperty({ example: 'This is name album' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(40)
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string;
}

export class UpdateAlbumDto {
  @ApiProperty({ example: 'changed name album 1' })
  @IsString()
  @MaxLength(50)
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({ example: 'changed description album 1' })
  @IsString()
  @MaxLength(200)
  readonly description: string;
}

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
