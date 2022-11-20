import { Controller, Get, Post,  UseGuards, Res, Req} from '@nestjs/common';
import { Request, Response } from 'express';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from './auth/guards/local.guard';

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

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Req() req : Request, @Res() res: Response) {
    const jwt=  await this.authService.login(req.user);
    res.setHeader('Authorization', 'Bearer '+jwt.access_token);
    res.cookie('JWT_token',jwt.access_token,{
      httpOnly: true,
      maxAge: 60 * 60 * 1000
    });
    return res.json('JWT_token');
  }

  @Post('/logout')
  async logout(@Res() res: Response) {
    res.cookie('JWT_token','',{
      maxAge: 0 
    });
    return res.send({
      message: 'logout success'
    })
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
