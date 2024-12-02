import { Module } from '@nestjs/common';
import { AuthController } from './controller/auth/auth.controller';
import { DashboardController } from './controller/dashboard/dashboard.controller';

@Module({
  controllers: [AuthController, DashboardController],
  providers: [],
})
export class HttpModule {}
