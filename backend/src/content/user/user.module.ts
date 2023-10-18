import { Module } from '@nestjs/common';
import { UsersProviders } from './user.provider';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DatabaseModule } from 'src/core/database/database.module';
import { AuthController } from './auth.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController, AuthController],
  providers: [...UsersProviders, UserService],
})
export class UserModule {}
