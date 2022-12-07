import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './configs/typeORM.config.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmConfigModule } from './configs/typeORM.config.module';
import { AuthModule } from './auth/auth.module';
import { ProductsController } from './products/products.controller';
import { ProductsModule } from './products/products.module';
import { CartsModule } from './carts/carts.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forRootAsync({
      imports: [TypeOrmConfigModule],
      useClass:TypeOrmConfigService,
      inject: [TypeOrmConfigService],}),
    UsersModule,
    AuthModule,
    ProductsModule,
    CartsModule,
  ],
  controllers: [AppController, ProductsController],
  providers: [
    AppService,
    // {
    //   provide: APP_GUARD,
    //   useClass: RolesGuard,
    // },
  ],
})
export class AppModule {}
