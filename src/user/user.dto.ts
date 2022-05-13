import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class CreateUserDto {
    @ApiProperty({ example: 'John123' })
    @IsNotEmpty()
    userName: string;

    @ApiProperty({ example: 'John' })
    @IsNotEmpty()
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

export class UpdateUserDto {

}
