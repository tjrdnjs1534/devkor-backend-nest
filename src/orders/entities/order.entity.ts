import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('orders')
export class OrderEntity {
    @PrimaryGeneratedColumn()
    id : number
    
}
