import { Column, Entity, PrimaryGeneratedColumn} from "typeorm"

@Entity()
export class UserEntity{
    @PrimaryGeneratedColumn() // 지워도 초기화 안되는듯?? 
    id : number;
    
    @Column()
    name : string;
    
    @Column()
    age :number;

    @Column()
    role : number;
}