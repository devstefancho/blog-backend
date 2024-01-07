import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContentController } from './content/content.controller';
import { ContentService } from './content/content.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.development',
    }),
  ],
  controllers: [AppController, ContentController],
  providers: [AppService, ContentService],
})
export class AppModule {}
