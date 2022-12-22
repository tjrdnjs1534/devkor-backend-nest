import { ProductEntity } from "src/products/entities/product.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { OrderEntity } from "./order.entity";

@Entity('order_detail')
export class OrderDetailEntity{
    @PrimaryGeneratedColumn()
    order_detail_no : number

    @Column()
    subtotal_price: number

    @Column()
    count : number

    @Column({default : false})
    state : boolean

    @ManyToOne(type => OrderEntity, order => order.orders_detail, {
        cascade: true, onDelete: "CASCADE"
    })
    @JoinColumn({ name: 'ref_order_no' })
    order : OrderEntity

    @ManyToOne(type => ProductEntity, product => product.orders_detail, {
        cascade: true, onDelete: "CASCADE"
    })
    @JoinColumn({ name: 'ref_productID' })
    product : ProductEntity 

}
    