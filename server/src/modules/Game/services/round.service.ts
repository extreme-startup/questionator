import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, InsertResult } from 'typeorm';
import { Round } from '../entities/round';
import { ResponseDto } from '../interfaces/response.dto';
import {
  RoundListResponseDto,
  RoundCreateRequestDto,
} from '../interfaces/round.dto';

@Injectable()
export class RoundService {
  constructor(
    @InjectRepository(Round)
    private readonly roundRepository: Repository<Round>,
  ) {}

  public async getList(): Promise<ResponseDto<RoundListResponseDto[]>> {
    try {
      const rounds: Round[] = await this.roundRepository.find({
        relations: ['round_steps', 'questions', 'sessions', 'games'],
      });

      return {
        error: undefined,
        data: rounds,
      };
    } catch (error) {
      return {
        error,
        data: undefined,
      };
    }
  }

  public async upsert(round: RoundCreateRequestDto) {
    try {
      let searchedRound: Round = await this.roundRepository.findOne({
        where: (r: Round) =>
          r.game.id === round.gameId && r.round === round.round,
      });

      if (!!searchedRound) {
        searchedRound = {
          ...searchedRound,
          includePreviousRound: round.includePreviousRound,
          questions: round.roundQuestions,
        };

        await this.roundRepository.save(searchedRound);
      }

      return {
        error: undefined,
        data: round,
      };
    } catch (error) {
      return {
        error,
        data: undefined,
      };
    }
  }
}
