import { IsEmail, IsString, MinLength, MaxLength, Matches } from "class-validator";

export class RegisterDto {
    @IsString()
    @MinLength(3)
    @MaxLength(50)
    @Matches(/^[a-zA-Z0-9_-]+$/, {
        message: "Login can only contain letters, numbers, underscores and hyphens",
    })
    login: string;

    @IsEmail({}, { message: "Invalid email format" })
    email: string;

    @IsString()
    @MinLength(8, { message: "Password must be at least 8 characters" })
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, {
        message: "Password must contain uppercase, lowercase, number and special character",
    })
    password: string;

    @IsString()
    @MinLength(2)
    @MaxLength(100)
    name: string;
}