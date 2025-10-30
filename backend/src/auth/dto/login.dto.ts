import { IsString, IsNotEmpty } from "class-validator";

export class LoginDto {
    @IsString()
    @IsNotEmpty()
    loginOrEmail: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}