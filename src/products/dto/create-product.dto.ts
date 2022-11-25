import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { CreatePhotoDto } from "./create-photo.dto";

export class CreateProductDto {
    //name, price, category, size
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsNumber()
    price: number;

    //category: string;
    photos: CreatePhotoDto;
}
