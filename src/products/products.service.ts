import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductEntity } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productsRepository : Repository<ProductEntity>
  ) {}

  async createProduct(createProductDto: CreateProductDto) {
    await this.productsRepository.save(createProductDto);
    return createProductDto;
  }

  async findAllProducts(): Promise<ProductEntity[]> {
    return this.productsRepository.find();
  }

  async findProductByID(id: number) {
    const product = await this.productsRepository.findOneBy({id})
    if(!product){
      throw new NotFoundException("can't find product");
    }
    return product;
  }

  async updateProduct(id: number, updateProductDto: UpdateProductDto) {
    const updateProduct = await this.productsRepository.findOneBy({id});
    if(!updateProduct){
      throw new NotFoundException("can't find product");
    }
    await this.productsRepository.update(id,{
      //바꿀거
    })
  }

  async removeProduct(id: number) {
    await this.productsRepository.delete(id);
  }
}
