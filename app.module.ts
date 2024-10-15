import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './src/cats/cats.controller';
import { CatsService } from './src/cats/cats.service';
import { PrismaService } from './src/prisma/prisma.service';

@Module({
  imports: [],
  controllers: [AppController, CatsController],
  providers: [AppService, CatsService, PrismaService],
})
export class AppModule {}
