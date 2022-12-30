import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
       type: 'postgres',
       url: this.configService.get('DATABASE_URL'),
      // host: this.configService.get('DB_HOST'),
      // port: +this.configService.get('DB_PORT'),
      // username: this.configService.get('DB_USER'),
      // password: this.configService.get('DB_PASSWORD'),
      // database: this.configService.get('DB_DATABASE'),
      // entities: [__dirname + '/../**/*.entity.{js,ts}'],

      // type: 'postgres',
      // host: 'localhost',
      // port: 5432,
      // username: 'admin',
      // password: '9240',
      // database: 'dk_project',
      autoLoadEntities: true,
      synchronize: true,
    };
  }
}


//env 설정하기??
