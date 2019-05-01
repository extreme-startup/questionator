import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Player } from '../../entity/Player';
import { PlayerDto } from './player.dto';

@Injectable()
export class PlayerService {
  constructor(
    @InjectRepository(Player)
    private playerRepository: Repository<Player>,
  ) {}

  async create(data: Partial<PlayerDto>): Promise<Player> {
    const player = this.playerRepository.create(data);
    return this.playerRepository.save(player);
  }
}
