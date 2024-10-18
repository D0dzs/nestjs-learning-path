import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsService } from './cats/cats.service';
import { CatsController } from './cats/cats.controller';
import { PrismaService } from './prisma/prisma.service';
import { TokenController } from './token/token.controller';
import { TokenService } from './token/token.service';

@Module({
  imports: [],
  controllers: [AppController, CatsController, TokenController],
  providers: [AppService, CatsService, PrismaService, TokenService],
})
export class AppModule {}
