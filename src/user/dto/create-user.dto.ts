import { IsEmail, IsNotEmpty, MinLength} from "class-validator";
import { IsEmailUnique } from "../validation/is-email-unique.validator";

export class CreateUserDto {
    @IsNotEmpty({ message: 'Username cannot be empty' })
    username: string;

    @IsEmail(undefined, { message: 'Invalid e-mail' })
    @IsEmailUnique({ message: 'Email already registered' })
    email: string;

    @MinLength(6, { message: 'Password must be longer than 5 characters' })
    password: string;    
}