import {
  Controller,
  Get,
  Request,
  Res,
  Post,
  Body, UseGuards,
} from '@nestjs/common';
import { AppService } from './app.service';
import {AuthGuard} from './modules/Auth/auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello')
  getHello(): string {
    return this.appService.getHello();
  }

  // @Get('secret')
  // @UseGuards(AuthGuard)
  // getSecret(): string {
  //   return 'secret';
  // }
}
