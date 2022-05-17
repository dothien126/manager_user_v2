import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MaxLength } from "class-validator";

export class ChangePasswordDto {
  @ApiProperty({ example: 'abc@gmail.com' })
  @IsEmail()
  readonly email: string;

  @ApiProperty({ example: 'xxx' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(60)
  readonly password: string;
}
