import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService : AuthService) {
  }

  @Post('/login')
  login(@Body() dto : LoginDto) {
    return this.authService.login(dto);
  }

  @Post('/registration')
  registration(dto : CreateUserDto) {
    return this.authService.registration(dto);
  }
}
