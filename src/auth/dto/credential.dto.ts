import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class CredentialsDto {
  @ApiProperty()
  @IsString()
  userName: string

  @ApiProperty()
  @IsString()
  @MinLength(6)
  password: string;
}