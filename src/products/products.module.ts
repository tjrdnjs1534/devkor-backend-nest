import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { PhotoEntity } from './entities/productPhoto.entity';
import { CategoryEntity } from './entities/productCategory.entity';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
  imports: [TypeOrmModule.forFeature([ProductEntity,PhotoEntity,CategoryEntity])],
  exports: [ProductsService]
})
export class ProductsModule {}
