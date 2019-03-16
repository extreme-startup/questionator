import {
  Controller,
  Get,
  Request,
  Res,
  Post,
  Body,
} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello')
  getHello(@Request() req): string {
    return this.appService.getHello();
  }

  @Get('sessions')
  getSessions(@Request() req): string {
    return req.sessionStore;
  }

  @Post('auth')
  auth(@Request() req, @Body() user) {
    if (!req.session.user) {
      req.session.user = user.username;
    }
  }
}
