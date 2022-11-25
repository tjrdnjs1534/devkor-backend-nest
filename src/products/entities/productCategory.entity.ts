import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProductEntity } from "./product.entity";

@Entity('product_category')
export class CategoryEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    category_name: string;

    @ManyToMany(type => ProductEntity, product => product.category, {onDelete: 'SET NULL'})
    product : ProductEntity[]
}