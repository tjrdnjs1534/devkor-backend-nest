import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from 'src/products/entities/product.entity';
import { UserEntity } from 'src/users/entities/users.entity';
import { Repository } from 'typeorm';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { CartEntity } from './entities/cart.entity';

@Injectable()
export class CartsService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productsRepository: Repository<ProductEntity>,
    
    
    @InjectRepository(CartEntity)
    private readonly cartsRepository: Repository<CartEntity>
  ) {}

  async addItemInCart(productID : number, id : number) {
    const updateProduct = await this.productsRepository.findOne({
      where: { id: productID }
    });
    console.log(id)
    const cart = await this.cartsRepository.findOne({
        where: { id : id},
        relations: ['product'],
      });
    console.log(cart);
    cart.num_Items++;
    cart.product.push(updateProduct);
    await this.cartsRepository.save(cart);
  }

  async findAllInCart(id: number) {
    return await this.cartsRepository.find({
      where: { id: id },
      relations : ['product']
    });
  }

  async removeItemInCart(productID : number, id : number) {
    await this.cartsRepository
    .createQueryBuilder()
    .delete()
    .from('cart_products')
    .where('productsId = :productId', { productId : productID })
    .execute();
  }
}
