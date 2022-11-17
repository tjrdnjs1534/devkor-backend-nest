import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(
    private usersService: UsersService,
    private jwtService: JwtService
    ) {}

    async validateUser(userId:string, pass: string): Promise<any> {
        const user = await this.usersService.getUserByuserID(userId);
        if (user && user.password === pass) {
          const { password, ...result } = user;
          return result;
        }
        return null;
      }

      async login(user: any) {
        const payload = { name: user.name, role:user.role  };
        return {
          access_token: this.jwtService.sign(payload),
        };
    }
}
