import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from 'src/products/entities/product.entity';
import { UserEntity } from 'src/users/entities/users.entity';
import { OrderEntity } from './entities/order.entity';
import { OrderDetailEntity } from './entities/orderDetail.entity';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService],
  imports: [TypeOrmModule.forFeature([ProductEntity,UserEntity,OrderEntity,OrderDetailEntity])]
})
export class OrdersModule {}
