import { UserEntity } from "src/users/entities/users.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { OrderDetailEntity } from "./orderDetail.entity";

@Entity('orders')
export class OrderEntity {
    @PrimaryGeneratedColumn()
    order_no : number

    @Column()
    zipcode : number

    @Column()
    address : string

    @Column()
    orderer_name : string

    @Column()
    receiver_name : string
    
    @Column()
    phone_no : number

    @Column()
    total_price : number

    @ManyToOne(type => UserEntity, user => user.orders, {
        cascade: true, onDelete: "CASCADE"
    })
    @JoinColumn({ name: 'ref_userID' })
    user : UserEntity 


    @OneToMany(type => OrderDetailEntity, order_detail=> order_detail.order, { nullable: true })
    orders_detail : OrderDetailEntity[]

}
