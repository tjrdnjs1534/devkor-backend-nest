import { ProductEntity } from "src/products/entities/product.entity";
import { Column, Entity, JoinTable, ManyToMany,  PrimaryGeneratedColumn } from "typeorm";

@Entity('cart')
export class CartEntity{
    @PrimaryGeneratedColumn()
    id: number
    @Column({default: 0})
    num_Items : number
    
    @ManyToMany(type => ProductEntity, product => product.carts,)
    @JoinTable({name: 'cart_products'})
    product : ProductEntity[]
}