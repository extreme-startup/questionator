import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, InsertResult } from 'typeorm';
import { ResponseDto } from '../interfaces/response.dto';
import { GameResponseDto } from '../interfaces/game.dto';
import { NotificationService } from './notification.service';
import { Game } from '../entities/game';

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(Game)
    private readonly gameRepository: Repository<Game>,
    private readonly notificationService: NotificationService,
  ) {}

  public async getList(): Promise<ResponseDto<GameResponseDto[]>> {
    try {
      const list: Game[] = await this.gameRepository.find();
      const data: GameResponseDto[] = list.map(({ name, status }: Game) => ({
        name,
        status,
      }));

      return {
        error: undefined,
        data,
      };
    } catch (error) {
      return {
        error,
        data: undefined,
      };
    }
  }

  public async create(game: Game): Promise<ResponseDto<GameResponseDto>> {
    try {
      const result: InsertResult = await this.gameRepository.insert(game);

      // tslint:disable-next-line:no-console
      console.log('Created game: ', result);

      return {
        error: undefined,
        data: {
          ...game,
          status: false,
        },
      };
    } catch (error) {
      return {
        error,
        data: undefined,
      };
    }
  }

  public async start(id: string): Promise<ResponseDto<GameResponseDto>> {
    try {
      const game: Game = await this.toggleGameStatusById(id);

      // ToDo: Add scheduler to notify users
      // this.notificationService.notifyPlayers(game);

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

  public async stop(id: string): Promise<ResponseDto<GameResponseDto>> {
    try {
      const game: Game = await this.toggleGameStatusById(id);

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

  private async toggleGameStatusById(id: string): Promise<Game> {
    const game: Game = await this.gameRepository.findOne(id);

    if (!!game) {
      game.status = !game.status;
      await this.gameRepository.save(game);
    }

    // tslint:disable-next-line:no-console
    console.log('toggle game status: ', game);

    return game;
  }
}
