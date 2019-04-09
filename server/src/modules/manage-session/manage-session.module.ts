import { Module } from '@nestjs/common';
import { ManageSessionService } from './manage-session.service';
import { ManageSessionController } from './manage-session.controller';

@Module({
  providers: [ManageSessionService],
  controllers: [ManageSessionController],
})
export class ManageSessionModule {}
