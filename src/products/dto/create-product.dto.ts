import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { CreatePhotoDto } from "./create-photo.dto";
import { productCategory } from "../productCategory.enum"
export class CreateProductDto {
    //name, price, category, size
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsNumber()
    price: number;

    @IsEnum(productCategory)
    categories: productCategory[];

    photos: CreatePhotoDto;
}
