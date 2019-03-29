import { Controller, Post, Body } from '@nestjs/common';
import { PlayersService } from '../services/players.service';
import { PlayerRequestDto, PlayerResponseDto } from '../interfaces/player.dto';
import { ResponseDto } from '../interfaces/response.dto';

@Controller('players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Post()
  public register(
    @Body() player: PlayerRequestDto,
  ): ResponseDto<PlayerResponseDto> {
    return this.playersService.register({
      ...player,
      sessionId: `${parseInt(`${Math.random() * 1000000}`, undefined)}`,
    });
  }
}
