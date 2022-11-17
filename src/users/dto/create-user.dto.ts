import {IsNotEmpty, IsNumber, IsString} from 'class-validator'
export class CreateUserDto {

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNumber()
    age :number;

    @IsNumber()
    role : number;
    
    @IsNotEmpty()
    @IsString()
    userID : string;

    @IsNotEmpty()
    @IsString()
    password : string;
    
}