import { Module } from '@nestjs/common';
import { AdminDashboardController } from './admin_dashboard.controller';
import { AdminDashboardService } from './admin_dashboard.service';

@Module({
  controllers: [AdminDashboardController],
  providers: [AdminDashboardService],
})
export class AdminDashboardModule {}
