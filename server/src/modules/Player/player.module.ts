import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Player } from '../../entity/Player';
import { PlayerService } from './player.service';

@Module({
  imports: [TypeOrmModule.forFeature([Player])],
  providers: [PlayerService],
  exports: [PlayerService],
})
export class PlayerModule {}
