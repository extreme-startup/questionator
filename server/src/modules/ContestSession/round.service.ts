import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Round } from '../../entity/Round';
import { ResponseDto } from '../../models/response.dto';
import { Tables } from '../../models/tables.dto';
import { toQuestionDto } from '../Question/helpers/questions.helper';
import { RoundDto, RoundRequestDto } from './round.dto';

function toRoundDto(round: Round): RoundDto {
  return {
    round: round && round.round,
    questions: Array.isArray(round && round.questions)
      ? round.questions.map(toQuestionDto)
      : [],
  };
}

@Injectable()
export class RoundService {
  constructor(
    @InjectRepository(Round) private roundRepository: Repository<Round>,
  ) {}

  public async list(): Promise<ResponseDto<Round[]>> {
    try {
      const rounds: Round[] = await this.roundRepository.find({
        relations: ['questions'],
      });

      return {
        data: rounds,
        error: undefined,
      };
    } catch (error) {
      return {
        data: undefined,
        error,
      };
    }
  }

  public async create(
    payload: Partial<RoundRequestDto>,
  ): Promise<ResponseDto<Round>> {
    try {
      const round: Round = await this.roundRepository.save(
        this.roundRepository.create(payload),
      );

      return {
        data: round,
        error: undefined,
      };
    } catch (error) {
      return {
        data: undefined,
        error,
      };
    }
  }
}
