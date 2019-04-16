import { Controller, Post, Body } from '@nestjs/common';
import { PlayersService } from '../services/players.service';
import { PlayerRequestDto, PlayerResponseDto } from '../interfaces/player.dto';
import { ResponseDto } from '../interfaces/response.dto';

@Controller('players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Post()
  public async register(
    @Body() player: PlayerRequestDto,
  ): Promise<ResponseDto<PlayerResponseDto>> {
    return await this.playersService.register(player);
  }
}
