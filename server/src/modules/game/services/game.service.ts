import { Injectable } from '@nestjs/common';
import { GameRepository } from '../repository/game.repository';
import { Game } from '../entity/game';
import { ResponseDto } from '../interfaces/response.dto';
import { GameResponseDto } from '../interfaces/game.dto';
import { NotificationService } from './notification.service';

@Injectable()
export class GameService {
  constructor(
    private readonly gameRepository: GameRepository,
    private readonly notificationService: NotificationService,
  ) {}

  public getList(): ResponseDto<GameResponseDto[]> {
    try {
      const list: Game[] = this.gameRepository.getList();

      return {
        error: undefined,
        data: list as GameResponseDto[],
      };
    } catch (error) {
      return {
        error,
        data: undefined,
      };
    }
  }

  public create(game: Game): ResponseDto<GameResponseDto> {
    try {
      const registeredGame: Game = this.gameRepository.registerGame(game);

      return {
        error: undefined,
        data: registeredGame,
      };
    } catch (error) {
      return {
        error,
        data: undefined,
      };
    }
  }

  public start(name: string): ResponseDto<GameResponseDto> {
    try {
      const game: Game = this.gameRepository.start(name);
      this.notificationService.notifyPlayers(game);

      return {
        error: undefined,
        data: game,
      };
    } catch (error) {
      return {
        error,
        data: undefined,
      };
    }
  }

  public stop(name: string) {
    try {
      const game: Game = this.gameRepository.stop(name);

      return {
        error: undefined,
        model: game,
      };
    } catch (error) {
      return {
        error,
        model: undefined,
      };
    }
  }
}
