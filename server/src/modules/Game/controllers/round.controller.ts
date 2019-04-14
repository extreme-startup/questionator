import { Controller, Post, Body } from '@nestjs/common';

@Controller('round')
export class RoundController {
  @Post()
  public add(@Body() player: PlayerRequestDto) {}
}
