import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ManageSessionService } from './manage-session.service';
import { ManageSessionController } from './manage-session.controller';
import { ManageSessionEntity } from '../../entities/ManageSessionEntity';
import { User } from '../../entities/User';

@Module({
  imports: [TypeOrmModule.forFeature([ManageSessionEntity, User])],
  providers: [ManageSessionService],
  controllers: [ManageSessionController],
})
export class ManageSessionModule {}
