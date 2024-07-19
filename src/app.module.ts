import { Module } from '@nestjs/common';
import { PostController } from './posts/post.controller';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [],
  controllers: [PostController],
  providers: [PrismaService],
})
export class AppModule {}
