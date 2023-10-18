import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from './core/core.module';
import { ConfigModule } from '@nestjs/config';
import { ContentModule } from './content/content.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CoreModule,
    ContentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
