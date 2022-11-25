import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductEntity } from './entities/product.entity';
import { CategoryEntity } from './entities/productCategory.entity';
import { PhotoEntity } from './entities/productPhoto.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productsRepository : Repository<ProductEntity>,

    @InjectRepository(PhotoEntity)
    private readonly photoRepository : Repository<PhotoEntity>,

    @InjectRepository(CategoryEntity)
    private readonly categoryRepository : Repository<CategoryEntity>
  ) {}

  async addPhoto(id: number, createPhotoDto: CreatePhotoDto){
    // await this.photoRepository.save(createPhotoDto);
    // const product_photo = new PhotoEntity();
    // product_photo.url = createPhotoDto.url;
    const product = await this.productsRepository.findOneBy({id});
    return await this.photoRepository.save({url: createPhotoDto.url, product: product})

  }

  async createProduct(createProductDto: CreateProductDto) {
    const product_photo = new PhotoEntity();
    product_photo.url = createProductDto.photos.url;
    await this.photoRepository.save(product_photo);
    const product = new ProductEntity()
    product.name = createProductDto.name;
    product.price = createProductDto.price;
    product.photos = [product_photo] ;  //여기 다 받아서 한 번에 여러장 하는 방법 생각해보기
    return await this.productsRepository.save(product); 
  }

  async findAllProducts(): Promise<ProductEntity[]> {
    return this.productsRepository.find({relations:{
      photos:true
    }});
  }

  async findProductByID(id: number): Promise<ProductEntity> {
    const product = await this.productsRepository.findOne({
      where: {id : id},
      relations: ['photos']
    }
    )
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
      name: updateProduct.name,
      price: updateProduct.price,
      photos: updateProduct.photos
    })
  }

  async removeProduct(id: number) {
    await this.productsRepository.delete(id);  // 삭제 시 사진 정보도 같이 삭제 되게 함
  }





  
}
