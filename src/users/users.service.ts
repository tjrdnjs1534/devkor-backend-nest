import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  getAllUsers() : Promise<UserEntity[]> {
    return this.usersRepository.find();
  }

  async getUserByID(id : number) : Promise<UserEntity> {
    const user = await this.usersRepository.findOneBy({ id })
    if(!user) {
        throw new NotFoundException("can't find user");
    }
    return user
  }

  async createUser(createUserDto : CreateUserDto) {
    const {id, name, age, role} = createUserDto;
    const newUser = this.usersRepository.create({
        id,
        name,
        age,
        role
    });
    await this.usersRepository.insert(newUser);
    return newUser  
  }

  async deleteUser(id : number) : Promise<void> {
    await this.usersRepository.delete(id);
  }

  async updateUser(id: number, updateUserDto : UpdateUserDto) : Promise<void> {
    const updateUser = await this.usersRepository.findOneBy({ id })
    if(!updateUser){
      throw new NotFoundException("can't find user");
    }
    const {age, role} = updateUserDto
    await this.usersRepository.update(
      updateUser,
      {age,role}
    );
     //update와 save 차이, id와 name은 변경할 수 없음
    //this.USER_DUMMY.push({...updateUser, ...updateUserDto})
  }
}
