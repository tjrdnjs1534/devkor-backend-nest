import { ProductEntity } from "src/products/entities/product.entity"

export class CreateOrderDto {
    user_id : number
    orderer_name : string
    receiver_name : string
    address : string
    zipcode : number
    phone_no : number
    total_price : number
    productsID : number[]
    count : number[]
}
