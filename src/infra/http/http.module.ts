import { Module } from '@nestjs/common';
import { AuthController } from './controller/auth/auth.controller';
import { CharacterController } from './controller/character/character.controller';
import { DashboardController } from './controller/dashboard/dashboard.controller';
import { InviteController } from './controller/invite/invite.controller';
import { ItemController } from './controller/item/item.controller';
import { SessionController } from './controller/session/session.controller';
import { UserController } from './controller/user/user.controller';

@Module({
  controllers: [
    AuthController,
    DashboardController,
    SessionController,
    CharacterController,
    InviteController,
    ItemController,
    UserController,
  ],
  providers: [],
})
export class HttpModule {}
