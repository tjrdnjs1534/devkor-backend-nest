import { Controller, Get, Post, UseGuards, Res, Req } from '@nestjs/common';
import { Request, Response } from 'express';
import { LocalAuthGuard } from './guards/local.guard';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Req() req: Request, @Res() res: Response) {
    const jwt = await this.authService.login(req.user);
    res.setHeader('Authorization', 'Bearer ' + jwt.access_token);
    res.cookie('JWT_token', jwt.access_token, {
      httpOnly: true,
      maxAge: 60 * 60 * 1000,
    });
    return res.json('JWT_token');
  }

  @Post('/logout')
  async logout(@Res() res: Response) {
    res.cookie('JWT_token', '', {
      maxAge: 0,
    });
    return res.send({
      message: 'logout success',
    });
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(): Promise<void> {
    // redirect google login page
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthCallback(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<void> {
    // ...
    const { user } = req;
    console.log(user);
  }
}
