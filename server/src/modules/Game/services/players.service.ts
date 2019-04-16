import { Injectable } from '@nestjs/common';
import { ResponseDto } from '../interfaces/response.dto';
import { Player } from '../entities/player';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, InsertResult } from 'typeorm';
import { PlayerRequestDto, PlayerResponseDto } from '../interfaces/player.dto';

@Injectable()
export class PlayersService {
  constructor(
    @InjectRepository(Player)
    private readonly playersRepository: Repository<Player>,
  ) {}

  public async register(player: PlayerRequestDto): Promise<ResponseDto<PlayerResponseDto>> {
    try {
      const newPlayer: InsertResult = await this.playersRepository.insert(player);

      return {
        error: undefined,
        data: player as PlayerResponseDto,
      };
    } catch (error) {
      return {
        error,
        data: undefined,
      };
    }
  }
}
