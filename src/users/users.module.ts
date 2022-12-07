import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UserEntity } from './entities/users.entity';
import { UsersService } from './users.service';
import { CartEntity } from 'src/carts/entities/cart.entity';

@Module({
  imports:[TypeOrmModule.forFeature([UserEntity,CartEntity])],
  controllers: [UsersController],
  providers: [UsersService,UserEntity],
  exports :[UsersService]
})
export class UsersModule {}
