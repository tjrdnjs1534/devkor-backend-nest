import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './configs/typeORM.config.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmConfigModule } from './configs/typeORM.config.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forRootAsync({
      imports: [TypeOrmConfigModule],
      inject: [TypeOrmConfigService],
      useClass:TypeOrmConfigService,}),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
