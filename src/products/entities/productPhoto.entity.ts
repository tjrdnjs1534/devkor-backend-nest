import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProductEntity } from "./product.entity";

@Entity('product_photo')
export class PhotoEntity{
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    url: string;

    @ManyToOne(type => ProductEntity, product => product.photos, {
        cascade: true, onDelete: "CASCADE"
    })
    @JoinColumn({ name: 'ref_productID' })
    product : ProductEntity
}