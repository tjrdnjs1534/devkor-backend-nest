import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from 'src/products/entities/product.entity';
import { UserEntity } from 'src/users/entities/users.entity';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderEntity } from './entities/order.entity';
import { OrderDetailEntity } from './entities/orderDetail.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly ordersRepository: Repository<OrderEntity>,
    
    @InjectRepository(OrderDetailEntity)
    private readonly orderDetailRepository: Repository<OrderDetailEntity>,

    @InjectRepository(UserEntity)
    private readonly usersRepository : Repository<UserEntity>,

    @InjectRepository(ProductEntity)
    private readonly productsRepository : Repository<ProductEntity>
  ){}

  async createOrder(createorderDto: CreateOrderDto) {
    //order detail 생성 product랑 연결
    //유저에서  order 연결
    //order 생성 유저랑 연결
    //order detail이랑 order랑 연결
    const orders_detail = []
    for (let i = 0; i<createorderDto.productsID.length; i++){
      const orderDetail = new OrderDetailEntity();
      const product = await this.productsRepository.findOne({
        where : {id : createorderDto.productsID[i]},
        relations : ['orders_detail']
      })
      product.orders_detail = [...product.orders_detail,orderDetail];
      orderDetail.count = createorderDto.count[i];
      orderDetail.subtotal_price = product.price * createorderDto.count[i];
      orders_detail.push(orderDetail);
      await this.orderDetailRepository.save(orderDetail);
      await this.productsRepository.save(product)
    }
    const user_id = createorderDto.user_id;
    const user = await this.usersRepository.findOne({
      where :{id: user_id}
    });
    const order = new OrderEntity();
    order.orderer_name = createorderDto.orderer_name;
    order.receiver_name = createorderDto.receiver_name;
    order.phone_no = createorderDto.phone_no;
    order.zipcode = createorderDto.zipcode;
    order.address = createorderDto.address;
    order.total_price = createorderDto.total_price;
    order.user = user;
    order.orders_detail = orders_detail;
    await this.ordersRepository.save(order);
    //여기 일단 대충 했는데 바꾸기 
    //전개 연산자 확인해보기
  }

  async findAllOrders() : Promise<OrderEntity[]>{
    return this.ordersRepository.find({
      relations:{
        orders_detail : true
      }
    });
  }

  async findOneOrder(id: number) : Promise<OrderEntity> {
    return this.ordersRepository.findOne({
      where : {
        order_no: id
      },
      relations:{
        orders_detail : true
      }
    });
  }

  async findProductOrders(id: number) : Promise<ProductEntity> {
    return this.productsRepository.findOne({
      where : {
        id :id
      },
      relations:{
        orders_detail : true
      }
    });
  }
  

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  async removeOrder(id: number) {
    await this.ordersRepository.delete(id)
  }
  async removeOrderDetail(id: number){
    await this.orderDetailRepository.delete(id)
  }
}
