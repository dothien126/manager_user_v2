import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsIn, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength, Validate, ValidateIf } from 'class-validator';
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

export class UpdateUserDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({example: 'Nghĩa Đô, Cầu Giấy, Hà Nội' , description: 'format: (xã phường, quận huyện, tỉnh thành phố)'})
  @IsString()
  @IsOptional()
  address?: string;
}
