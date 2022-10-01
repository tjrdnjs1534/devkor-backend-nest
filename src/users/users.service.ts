import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private USER_DUMMY = [{ id: "u1", name: "JangSeokWon", age: 23 },
                        { id: "u2", name: "kimsangyub", age: 24 }
                    ];

  getAllUsers() {
    return this.USER_DUMMY;
  }

  getUserByID(id : string) {
    const user = this.USER_DUMMY.find((user)=>user.id === id)
    if(!user) {
        throw new NotFoundException("can't find user");
    }
    return user
  }

  createUser(createUserDto : CreateUserDto) {
    const {id, name, age} = createUserDto;
    const newUser = {
        id,
        name,
        age
    }
    this.USER_DUMMY.push(newUser)
    return newUser  
  }

  deleteUser(id : string) {
    this.getUserByID(id)
    this.USER_DUMMY = this.USER_DUMMY.filter((user)=>user.id !== id);
  }

  updateUser(id: string, updateUserDto : UpdateUserDto) {
    const updateUser = this.getUserByID(id)
    this.deleteUser(id);
    this.USER_DUMMY.push({...updateUser, ...updateUserDto})
  }
}
