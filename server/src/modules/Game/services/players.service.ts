import { Injectable } from '@nestjs/common';
import { PlayersRepository } from '../repository/players.repository';
import { ResponseDto } from '../interfaces/response.dto';
import { Player } from '../entities/player';

@Injectable()
export class PlayersService {
  constructor(private readonly playersRepository: PlayersRepository) {}

  public register(player: Player): ResponseDto<Player> {
    try {
      const registeredPlayer: Player = this.playersRepository.register(player);

      return {
        error: undefined,
        data: registeredPlayer,
      };
    } catch (error) {
      return {
        error,
        data: undefined,
      };
    }
  }
}
