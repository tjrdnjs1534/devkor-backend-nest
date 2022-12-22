import { Module } from '@nestjs/common';
import { CartsService } from './carts.service';
import { CartsController } from './carts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartEntity } from './entities/cart.entity';
import { UserEntity } from 'src/users/entities/users.entity';
import { ProductEntity } from 'src/products/entities/product.entity';

@Module({
  controllers: [CartsController],
  providers: [CartsService],
  imports: [TypeOrmModule.forFeature([CartEntity, UserEntity, ProductEntity])],
})
export class CartsModule {}
