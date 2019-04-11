import {Controller, Get, HttpStatus, Response,Query} from '@nestjs/common';
import { ResultLoggerService } from './resultLogger.service';
import { AskedQuestion } from '../../entity/AskedQuestion';
import { ResultLoggerDto } from './dto/resultLogger.dto';

@Controller('results')
export class ResultLoggerController {
  constructor(private readonly resultLoggerService: ResultLoggerService) {}

  @Get()
  async findAllResults(
    @Response() res,
    @Query() query,
  ): Promise<AskedQuestion[]> {
    try {
      const { contestId, time } = query;
      const result = await this.resultLoggerService.getAllResults(+contestId, +time );
      return res.status(HttpStatus.OK).json(result);
    } catch (err) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: err });
    }
  }
}
