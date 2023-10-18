import { Module } from '@nestjs/common';
import { LocalizationProviders } from './localization.provider';
import { LocalizationService } from './localization.service';
import { LocalizationController } from './localization.controller';
import { DatabaseModule } from 'src/core/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [LocalizationController],
  providers: [...LocalizationProviders, LocalizationService],
})
export class LocalizationModule {}
