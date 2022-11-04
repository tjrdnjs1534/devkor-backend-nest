import {IsNotEmpty, IsNumber, IsString} from 'class-validator'
export class CreateUserDto {
    @IsNotEmpty()
    @IsNumber()
    id : number;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNumber()
    age :number;

    @IsNumber()
    role : number;
}