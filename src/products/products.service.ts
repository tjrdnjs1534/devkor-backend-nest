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
    private readonly productsRepository: Repository<ProductEntity>,

    @InjectRepository(PhotoEntity)
    private readonly photoRepository: Repository<PhotoEntity>,

    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

  async addPhoto(id: number, createPhotoDto: CreatePhotoDto) {
    const product = await this.productsRepository.findOneBy({ id });
    for (const url of createPhotoDto.url) {
      await this.photoRepository.save({ url: url, product: product });
    } // url array로 바꿈
  }

  async removeAllPhoto(id: number) {
    const productID = id;
    await this.photoRepository
      .createQueryBuilder()
      .delete()
      .from(PhotoEntity)
      .where('ref_productID = :ref_productID', { ref_productID: productID })
      .execute();
  } // photo id 받아서 ? 고민 필요

  async addCategory(id: number, updateProductDto : UpdateProductDto) {
    const updateProduct = await this.productsRepository.findOne({
      where: { id: id },
      relations: ['photos', 'categories'],
    });
    for (const category of updateProductDto.categories) {
      const findcategory = await this.categoryRepository.findOne({
        where: { category_name: category },
        relations: ['product'],
      });
      findcategory.product.push(updateProduct);
      await this.categoryRepository.save(findcategory);
    }
  }

  async removeAllCategory(id: number,) {
    const updateProduct = await this.productsRepository.findOne({
      where: { id: id },
      relations: ['categories'],
    });
    updateProduct.categories = []
    await this.productsRepository.save(updateProduct);
  }

  async createProduct(createProductDto: CreateProductDto) {
    const product = new ProductEntity();
    product.name = createProductDto.name;
    product.price = createProductDto.price;
    product.stock = createProductDto.stock;
    product.description = createProductDto.description;
    //여기 유지 보수 편하게 바꾸기
    await this.productsRepository.save(product);

    for (const category of createProductDto.categories) {
      const findcategory = await this.categoryRepository.findOne({
        where: { category_name: category },
        relations: ['product'],
      });
      
      if(!findcategory){ 
        throw new NotFoundException("cant");
      }

      findcategory.product.push(product);
      await this.categoryRepository.save(findcategory);
    } // 기존 카테고리에 등록하도록 함, error처리 필요
    for (const url of createProductDto.photos.url) {
      const product_photo = new PhotoEntity();
      product_photo.url = url;
      product_photo.product = product;
      await this.photoRepository.save(product_photo);
    }
  } // 등록시 사진 여러장도 가능하게  변경함

  async findAllProducts(): Promise<ProductEntity[]> {
    return this.productsRepository.find({
      relations: {
        photos: true,
        categories: true,
      },
    });
  }

  async findProductByID(id: number): Promise<ProductEntity> {
    const product = await this.productsRepository.findOne({
      where: { id: id },
      relations: ['photos', 'categories'],
    });
    if (!product) {
      throw new NotFoundException("can't find product");
    }
    return product;
  }

  async updateProduct(id: number, updateProductDto: UpdateProductDto) {
    const updateProduct = await this.productsRepository.findOne({
      where: { id: id },
      //relations: ['photos', 'categories'],
    });
    if (!updateProduct) {
      throw new NotFoundException("can't find product");
    }
    await this.productsRepository.update(id, {
      name: updateProductDto.name,
      price: updateProductDto.price,
      description : updateProductDto.description,
      stock : updateProductDto.stock
      //이부분 유지 보수 편하게 바구기
      //categories : updateProductDto.
    });
    await this.removeAllPhoto(id);
    await this.addPhoto(id, updateProductDto.photos);
    await this.removeAllCategory(id);
    await this.addCategory(id,updateProductDto);  

  } // 사진 카테고리  다 지우고 새로 추가하는 방식, 더 깔끔하게 할 방법찾기
  // update product를 direct로 넘겨서 추가적인 where 문 없도록 하기
  //Cannot query across one to many, many-to-many for property categories

  async removeProduct(id: number) {
    await this.productsRepository.delete(id); // 삭제 시 사진 정보도 같이 삭제 되게 함, 카테고리는 남아있음
  }
}
