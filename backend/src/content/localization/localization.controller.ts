import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { LocalizationService } from './localization.service';
import { Localization } from 'src/core/database/localization/localization.schema';
import { IdValidationPipe } from 'src/utils/validators/id.pipe';

@Controller('localizations')
export class LocalizationController {
  constructor(private service: LocalizationService) {}

  @Get()
  async getEnabledLocalizations(@Query() params: any) {
    return this.service.getAllLocalization({ ...params });
  }

  @Post()
  async createLocalization(@Body() localization: Localization) {
    return this.service.createLocalization(localization);
  }

  @Patch(':id')
  async updateLocalization(
    @Body() localization: Partial<Localization>,
    @Param('id', IdValidationPipe) id: string,
  ) {
    return this.service.updateLocalization(localization, id);
  }
}
