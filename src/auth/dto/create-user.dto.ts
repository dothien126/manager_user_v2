import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
  @ApiProperty({ example: 'John123' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(40)
  userName: string;

  @ApiProperty({ example: 'John' })
  @IsString()
  @MaxLength(30)
  name: string;

  @ApiProperty({ example: 'john123@gmail.com' })
  @Transform(({ value }) => value?.toLowerCase().trim())
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @MinLength(6)
  @IsNotEmpty()
  @IsString()
  password: string;

}

export class ChangePasswordDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  currentPassword: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  newPassword: string;
}