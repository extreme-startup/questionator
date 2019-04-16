import { Controller, Post, Body, Get, Put } from '@nestjs/common';
import { RoundCreateRequestDto } from '../interfaces/round.dto';
import { RoundService } from '../services/round.service';

@Controller('rounds')
export class RoundController {
  @Get()
  public async list() {
    return await this.roundService.getList();
  }

  @Post()
  public async add(@Body() round: RoundCreateRequestDto) {
      return await this.roundService.upsert(round);
  }

  @Put()
  public async update(@Body() round: RoundCreateRequestDto) {
      return await this.roundService.upsert(round);
  }

  constructor(private readonly roundService: RoundService) {}
}
