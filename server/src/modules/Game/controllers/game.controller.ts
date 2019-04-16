import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { GameService } from '../services/game.service';
import { GameRequestDto, GameResponseDto } from '../interfaces/game.dto';
import { ResponseDto } from '../interfaces/response.dto';

@Controller('games')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Get()
  public async list(): Promise<ResponseDto<GameResponseDto[]>> {
    return await this.gameService.getList();
  }

  @Post()
  public async create(@Body() game: GameRequestDto): Promise<ResponseDto<GameResponseDto>> {
    return await this.gameService.create({
      ...game,
      players: [],
      status: false,
    } as any);
  }

  @Get('/:id/start')
  public async start(@Param('id') id: string): Promise<ResponseDto<GameResponseDto>> {
    return await this.gameService.start(id);
  }

  @Get('/:id/stop')
  public async stop(@Param('id') id: string) {
    return await this.gameService.stop(id);
  }
}
