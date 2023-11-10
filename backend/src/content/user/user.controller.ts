import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { LocalizationAssign, User } from 'src/core/database/user/user.schema';
import * as mongoose from 'mongoose';

@Controller('users')
export class UserController {
  constructor(private service: UserService) {}

  @Get()
  getAllUsers() {
    return this.service.findAll();
  }

  @Get('localizations/:id')
  getLocalizationsAssignedToUser(
    @Param('id') id: mongoose.Schema.Types.ObjectId,
  ) {
    return this.service.getUserLocalizations(id);
  }

  @Post()
  createUser(@Body() body: User) {
    return this.service.create(body);
  }

  @Put('assign')
  assignLocalizationToUser(@Body() body: LocalizationAssign) {
    return this.service.assignLocalizationToAccount(body);
  }

  @Delete('localizations')
  removeLocalizationFromUser(
    @Body()
    body: {
      userId: string;
      localizationId: string;
    },
  ) {
    return this.service.removeUserLocalization(body);
  }
}
