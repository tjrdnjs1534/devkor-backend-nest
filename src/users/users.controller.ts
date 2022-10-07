import { Body, Controller, Delete, Get, Param, Post, Put , Patch } from '@nestjs/common';
import { UsersService } from './users.service';
import {CreateUserDto} from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto';
@Controller('users')
export class UsersController {
    constructor (private readonly usersService : UsersService) {}
    
    @Get()
    getAllUsers(){ 
        return this.usersService.getAllUsers()
    }


    @Post()
    createUser(@Body() createUserDto : CreateUserDto)
    {
        return this.usersService.createUser(createUserDto)
    } 

    @Get(':id')
    getUserByID(@Param('id') id: number)
    {
        return this.usersService.getUserByID(id)
    }

    @Delete(':id')
    deleteUser(@Param('id') id: number) 
    {
        this.usersService.deleteUser(id);
    }

    // @Patch(':id') 
    // updateUser(@Param('id') id:string, @Body())
    // {
    //     return
    // }
    @Put(':id')
    updateUser(@Param('id') id:number, @Body() updateUserDto : UpdateUserDto )
    {
        return this.usersService.updateUser(id,updateUserDto)
    }
}

