import {IsEnum, IsNotEmpty, IsNumber, IsString} from 'class-validator'
import { Role } from 'src/auth/BRAC/role.enum';
import { CartEntity } from 'src/carts/entities/cart.entity';
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
    
    cart : CartEntity
}