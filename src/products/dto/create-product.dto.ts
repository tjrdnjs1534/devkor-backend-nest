import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateProductDto {
    //name, price, category, size
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsNumber()
    price: number;



}
