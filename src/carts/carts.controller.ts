import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CartsService } from './carts.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';

@Controller('carts')
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  @Post()
  create(@Body('productID') productID : number, @Body('id') id : number ) {
    return this.cartsService.addItemInCart(productID, id);
  }

  @Get(':id')
  findALL(@Param('id') id: number) {
    return this.cartsService.findAllInCart(id);
  }

  @Delete()
  remove(@Body('productID') productID : number, @Body('id') id : number ) {
    return this.cartsService.removeItemInCart(productID, id);
  }
}
