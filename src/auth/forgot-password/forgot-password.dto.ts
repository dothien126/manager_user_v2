import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class ForgotPasswordDto {
  @ApiProperty({ example: 'abc@gmail.com' })
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  readonly email: string;
}