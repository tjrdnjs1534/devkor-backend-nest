import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Photo } from "./productPhoto.entity";

@Entity('product')
export class ProductEntity {
    //상품아이디, 상품명, 가격, 상품 등록일 , 재고, 조회수, 판매수 상품 이미지, 상품 설명, 사이즈
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name : string;

    @Column()
    price: number;

    @Column()
    date : string;

    @Column()
    category : string;

    @Column()
    stock: number;

    @OneToMany(type=> Photo, photo =>photo.product)
    photos: Photo[];
}
