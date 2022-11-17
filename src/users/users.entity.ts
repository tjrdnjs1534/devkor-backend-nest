import { Role } from "src/auth/BRAC/role.enum";
import { Column, Entity, PrimaryGeneratedColumn} from "typeorm"

@Entity('user')
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
}