import {IsEnum, IsNotEmpty, IsNumber, IsString} from 'class-validator'
import { Role } from 'src/auth/BRAC/role.enum';
export class CreateUserDto {

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNumber()
    age :number;

    @IsEnum(Role)
    role : Role;
    
    @IsNotEmpty()
    @IsString()
    userID : string;

    @IsNotEmpty()
    @IsString()
    password : string;
    
}