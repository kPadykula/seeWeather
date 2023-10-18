import {
  Body,
  Controller,
  Get,
  Post,
  RawBodyRequest,
  Req,
  Request,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'src/core/database/user/user.schema';

@Controller('users')
export class UserController {
  constructor(private service: UserService) {}

  @Get()
  getAllUsers() {
    return this.service.findAll();
  }

  @Post()
  createUser(@Body() body: User) {
    return this.service.create(body);
  }
}
