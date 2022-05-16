import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsIn, IsNotEmpty, IsString, MaxLength, MinLength, Validate, ValidateIf } from 'class-validator';
import { UserRole, UserStatus } from './user.entity';

export class UserDto {
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
  password: string;
}

export class UserProfileDto {
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
}

