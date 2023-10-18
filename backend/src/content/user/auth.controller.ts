import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { Credentials } from 'src/core/database/user/user.schema';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private service: UserService) {}

  @Post()
  login(@Body() credentials: Credentials, @Res() res: Response) {
    return this.service.login(credentials).then((user) => {
      if (user) {
        return res.status(HttpStatus.FOUND).json(user);
      } else {
        return res.status(HttpStatus.UNAUTHORIZED).json({
          message: 'Invalid credentials',
        });
      }
    });
  }
}
