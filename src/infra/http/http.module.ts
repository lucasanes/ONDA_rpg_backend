import { Module } from '@nestjs/common';
import { AuthController } from './controller/auth/auth.controller';

@Module({
  controllers: [AuthController],
  providers: [],
})
export class HttpModule {}
