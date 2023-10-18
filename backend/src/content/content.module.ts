import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { LocalizationModule } from './localization/localization.module';

@Module({
  imports: [UserModule, LocalizationModule],
})
export class ContentModule {}
