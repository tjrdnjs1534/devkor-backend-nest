import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { productCategory } from "../productCategory.enum";
import { ProductEntity } from "./product.entity";

@Entity('product_category')
export class CategoryEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'enum', enum: productCategory, default: productCategory.Male })
    category_name: productCategory;

    @ManyToMany(type => ProductEntity, product => product.categories, {onDelete: 'SET NULL'})
    product : ProductEntity[]
}