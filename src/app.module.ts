import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContentController } from './content/content.controller';
import { ContentService } from './content/content.service';
import { ConfigModule } from '@nestjs/config';
import { ContentsService } from './contents/contents.service';
import { ContentsController } from './contents/contents.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { VisitModule } from './visit/visit.module';
import { Visit } from './visit/entities/visit.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.development',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [Visit],
      keepConnectionAlive: true,
      logging: true,
      // synchronize: true,
      namingStrategy: new SnakeNamingStrategy(),
    }),
    VisitModule,
  ],
  controllers: [AppController, ContentController, ContentsController],
  providers: [AppService, ContentService, ContentsService],
})
export class AppModule {}
