import { Controller, Get, Post,  UseGuards, Res, Req} from '@nestjs/common';
import { Request, Response } from 'express';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService) {}

  @UseGuards(JwtAuthGuard) 
  @Get('profile')
  getProfile(@Req() req : Request){
    return req.user;
  }


  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
