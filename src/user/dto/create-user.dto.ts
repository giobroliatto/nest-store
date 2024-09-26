import { IsEmail, IsNotEmpty, MinLength} from "class-validator";

export class CreateUserDto {
    @IsNotEmpty({ message: 'Username cannot be empty' })
    username: string;

    @IsEmail(undefined, { message: 'Invalid e-mail' })
    email: string;

    @MinLength(6, { message: 'Password must be longer than 5 characters' })
    password: string;    
}