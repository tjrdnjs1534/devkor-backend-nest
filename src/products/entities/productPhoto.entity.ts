import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProductEntity } from "./product.entity";

@Entity('product_photo')
export class Photo{
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    url: string;

    @ManyToOne(type => ProductEntity, product => product.photos)
    @JoinColumn({ name: 'ref_productID' })
    product : ProductEntity
}