import { Body, Controller, Delete, Get, Param, Post, Put , Patch, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import {CreateUserDto} from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/users.entity';
import { Roles } from 'src/auth/BRAC/roles.decorator';
import { Role } from 'src/auth/BRAC/role.enum';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/role.guard';
@Controller('users')

export class UsersController {
    constructor (private readonly usersService : UsersService) {}
    
    @Get()
    @Roles(Role.Admin)
    @UseGuards(JwtAuthGuard,RolesGuard)
    getAllUsers() : Promise<UserEntity[]>{ 
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

    @Put(':id')
    updateUser(@Param('id') id:number, @Body() updateUserDto : UpdateUserDto )
    {
        return this.usersService.updateUser(id,updateUserDto)
    }
}

