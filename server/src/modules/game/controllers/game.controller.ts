import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { GameService } from '../services/game.service';
import { GameRequestDto, GameResponseDto } from '../interfaces/game.dto';
import { ResponseDto } from '../interfaces/response.dto';

@Controller('games')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Get()
  public list(): ResponseDto<GameResponseDto[]> {
    return this.gameService.getList();
  }

  @Post()
  public create(@Body() game: GameRequestDto): ResponseDto<GameResponseDto> {
    return this.gameService.create({
      ...game,
      players: [],
      status: false,
    });
  }

  @Get('/:name/start')
  public start(@Param('name') name: string): ResponseDto<GameResponseDto> {
    return this.gameService.start(name);
  }

  @Get('/:name/stop')
  public stop(@Param('name') name: string) {
    return this.gameService.stop(name);
  }
}
