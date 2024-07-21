import {
  RequestMethod,
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';
import { PostController } from './posts/post.controller';
import { PrismaService } from './prisma/prisma.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from 'prisma/prisma.module';
import { UserController } from './users/user.controller';
import { JwtService } from '@nestjs/jwt';
import { AdminDashboardModule } from './admin_dashboard/admin_dashboard.module';
import { APP_GUARD } from '@nestjs/core';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { RolesGuard } from './roles/roles.guard';

@Module({
  imports: [AuthModule, PrismaModule, AdminDashboardModule],
  controllers: [PostController, UserController],
  providers: [
    PrismaService,
    JwtService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule implements NestModule {
  async configure(consumer: MiddlewareConsumer) {
    await consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: 'auth/admin/dashboard', method: RequestMethod.GET });
  }
}
