import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CategoryEntity } from "./productCategory.entity";
import { PhotoEntity } from "./productPhoto.entity";

@Entity('products')
export class ProductEntity {
    //상품아이디, 상품명, 가격, 상품 등록일 , 재고, 조회수, 판매수 상품 이미지, 상품 설명, 사이즈
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name : string;

    @Column()
    price: number;

    // @Column()
    // date : string;

    @Column()
    stock: number;
    
    @Column()
    description: string;

    @ManyToMany(() => CategoryEntity, (category) => category.product)
    @JoinTable({name: 'p_c'})
    categories : CategoryEntity[];

    @OneToMany(type=> PhotoEntity, photo =>photo.product, { nullable: true })
    photos: PhotoEntity[];
}
