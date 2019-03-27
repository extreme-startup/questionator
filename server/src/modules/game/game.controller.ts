import {
  Controller,
  Post,
  Get,
  Req,
  Res,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { GameService } from './services/game.service';
import { LocalTunnelService } from './services/local-tunnel.service';

@Controller('game/:id')
export class GameController {
  constructor(
    private readonly gameService: GameService,
    private readonly localTunnelService: LocalTunnelService,
  ) {}

  @Get('register')
  public async register(
    @Req() req: Request,
    @Res() res: Response,
    @Param('id') id: string,
  ) {
    await this.gameService.register(id);
    await this.localTunnelService.start();

    return res
      .status(HttpStatus.CREATED)
      .send(`Local tunnel started on ${this.localTunnelService.url}`);
  }

  @Post('start')
  public async start(
    @Req() req: Request,
    @Res() res: Response,
    @Param('id') id: string,
  ) {
    await this.gameService.start(id);
  }

  @Post('stop')
  public async stop(@Param('id') id: string) {
    await this.gameService.stop(id);
  }
}
