import { Module } from '@nestjs/common';
import { PostController } from './posts/post.controller';
import { PrismaService } from './prisma/prisma.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from 'prisma/prisma.module';
import { UserController } from './users/user.controller';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [AuthModule, PrismaModule],
  controllers: [PostController, UserController],
  providers: [PrismaService, JwtService],
})
export class AppModule {}
