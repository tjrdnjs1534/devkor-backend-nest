import { Module } from "@nestjs/common";
import { TypeOrmConfigService } from "./typeORM.config.service";

@Module({
    providers:[TypeOrmConfigService]
})

export class TypeOrmConfigModule {};