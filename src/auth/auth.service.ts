import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { User } from '../users/users.model';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(private userService : UsersService,
              private jwtService : JwtService) {
  }

  async login(dto: LoginDto) {
    const user = await this.validateUser(dto);

    return this.generateToken(user);
  }

  async registration(dto : CreateUserDto) {
    const candidate = await this.userService.getByEmail(dto.email);

    if (candidate)
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);

    const user = await this.userService.create(dto);

    return this.generateToken(user);
  }

  private async validateUser(dto: LoginDto) : Promise<User> {
    const user = await this.userService.getByEmail(dto.email);
    const passwordEquals = await bcrypt.compare(dto.password, user.password);

    if (passwordEquals && user) return user;

    throw new UnauthorizedException({message: 'Email or password is incorrect'});
  }

  private generateToken(user : User) {
    const payload = {email: user.email, id: user.id, username: user.username, roles: user.roles};

    return {
      token: this.jwtService.sign(payload)
    };
  }
}
