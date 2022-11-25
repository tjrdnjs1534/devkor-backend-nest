import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { Role } from 'src/auth/BRAC/role.enum';
import { Roles } from 'src/auth/BRAC/roles.decorator';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  
  @Post()
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard,RolesGuard)
  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productsService.createProduct(createProductDto);
  }

  @Post(':id')
  addPhoto(@Param('id') id:number, @Body() createPhotoDto : CreatePhotoDto){
    return this.productsService.addPhoto(id, createPhotoDto)
  }
  
  @Get()
  findAllProducts() {
    return this.productsService.findAllProducts();
  }

  @Get(':id')
  findProductByID(@Param('id') id: number) {
    return this.productsService.findProductByID(id);
  }

  @Patch(':id')
  updateProduct(@Param('id') id: number, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.updateProduct(id, updateProductDto);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard,RolesGuard)
  removeProduct(@Param('id') id: string) {
    return this.productsService.removeProduct(+id);
  }
}
