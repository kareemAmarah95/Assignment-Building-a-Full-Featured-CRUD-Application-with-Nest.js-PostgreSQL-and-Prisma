import { Controller, UseGuards } from '@nestjs/common';
import { RolesGuard } from 'src/roles/roles.guard';

@Controller('admin')
@UseGuards(RolesGuard)
export class AdminDashboardController {}
