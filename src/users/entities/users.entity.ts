import { Role } from "src/auth/BRAC/role.enum";
import { OrderEntity } from "src/orders/entities/order.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm"
import { CartEntity } from "../../carts/entities/cart.entity";

@Entity('users')
export class UserEntity{
    @PrimaryGeneratedColumn() // 지워도 초기화 안되는듯?? 
    id : number;
    
    @Column()
    name : string;
    
    @Column()
    age :number;

    @Column({ type: 'enum', enum: Role, default: Role.User })
    role : Role;

    @Column()
    userID: string;
    
    @Column()
    password : string;

    @OneToOne(()=>CartEntity)
    @JoinColumn({ name: 'ref_cartID' })
    cart : CartEntity

    @OneToMany(type=> OrderEntity, order =>order.user, { nullable: true })
    orders : OrderEntity[]

}

