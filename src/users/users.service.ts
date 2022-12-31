import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/users.entity';
import * as bcrypt from 'bcrypt';
import { CartEntity } from 'src/carts/entities/cart.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,

    @InjectRepository(CartEntity)
    private cartsRepository: Repository<CartEntity>
  ) {}

  async getAllUsers(): Promise<UserEntity[]> {
    return this.usersRepository.find();
  }

  async getUserByID(id: number): Promise<UserEntity> {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException("can't find user");
    }
    return user;
  }
  async getUserByuserID(userID: string): Promise<UserEntity> {
    const user = await this.usersRepository.findOne({
      where: { userID: userID },
      relations: ['cart'],
    });
    if (!user) {
      throw new NotFoundException("can't find user");
    }
    return user;
  }

  async HashPassword(plainPassword: string) {
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(plainPassword, saltOrRounds);
    return hash
  }

  async createUser(createUserDto: CreateUserDto) {
    // const { id, name, age, role } = createUserDto;
    // const newUser = this.usersRepository.create({
    //   id,
    //   name,
    //   age,
    //   role,
    // });
    const newCart = new CartEntity();
    await this.cartsRepository.save(newCart);
    createUserDto.password = await this.HashPassword(createUserDto.password);
    createUserDto.cart = newCart;
    await this.usersRepository.save(createUserDto); // 카트 생성 하기
    return createUserDto;
  }

  async deleteUser(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<void> {
    const updateUser = await this.usersRepository.findOneBy({ id });
    if (!updateUser) {
      throw new NotFoundException("can't find user");
    }
    await this.usersRepository.update(id, {
      age: updateUserDto.age,
      //role: updateUserDto.role,
    });

    //update와 save 차이, id와 name은 변경할 수 없음
    //this.USER_DUMMY.push({...updateUser, ...updateUserDto})
  }
}
