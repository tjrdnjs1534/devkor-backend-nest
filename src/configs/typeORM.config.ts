import { TypeOrmModuleOptions} from "@nestjs/typeorm"
export const typeORMConfig : TypeOrmModuleOptions = {
    type :'postgres',
    host : 'localhost',
    port : 5432,
    username: 'seokwon',
    password: 'postgres',
    database: 'test',
    entities : [__dirname +  '/../**/*.entity.{js,ts}'],
    synchronize : true
}


//env 설정하기