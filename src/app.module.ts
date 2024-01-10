import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContentController } from './content/content.controller';
import { ContentService } from './content/content.service';
import { ConfigModule } from '@nestjs/config';
import { ContentsService } from './contents/contents.service';
import { ContentsController } from './contents/contents.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.development',
    }),
  ],
  controllers: [AppController, ContentController, ContentsController],
  providers: [AppService, ContentService, ContentsService],
})
export class AppModule {}
