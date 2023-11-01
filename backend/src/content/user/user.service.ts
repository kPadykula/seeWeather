import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Response,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { DatabaseConstants } from 'src/core/constants';
import { Credentials, User } from 'src/core/database/user/user.schema';

@Injectable()
export class UserService {
  constructor(
    @Inject(DatabaseConstants.USER_MODEL) private userModel: Model<User>,
  ) {}

  async create(createUserDTO: User): Promise<User> {
    const createdUser = new this.userModel(createUserDTO);
    return this.userModel.findOne({ email: createdUser.email }).then((user) => {
      if (user)
        throw new HttpException('Email already in use', HttpStatus.BAD_REQUEST);
      else return createdUser.save();
    });
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async login(credentials: Credentials): Promise<User | null> {
    return this.userModel.findOne({
      email: credentials.email,
      password: credentials.password,
    });
  }
}
