import {Controller, Get, HttpStatus, Response, Query} from '@nestjs/common';
import { ResultLoggerService } from './resultLogger.service';
import { AskedQuestion } from '../../entity/AskedQuestion';
import { ApiResponse, ApiOperation, ApiImplicitQuery} from '@nestjs/swagger';

@Controller('results')
export class ResultLoggerController {
  constructor(private readonly resultLoggerService: ResultLoggerService) {}

  @Get()
  @ApiOperation({ title: 'Result Logger', description: 'Get Session Results by sessionId with filter by time' })
  @ApiResponse({ status: 200, type: AskedQuestion, isArray: true })
  @ApiImplicitQuery({ name: 'sessionId', description: 'Current Session Id'})
  @ApiImplicitQuery({ name: 'time', description: 'Time filter (more than) in milliseconds'})
  async findAllResults(
    @Response() response,
    @Query() query,
  ): Promise<AskedQuestion[]> {
    try {
      const { sessionId, time } = query;
      const result = await this.resultLoggerService.getAllResults(+sessionId, +time);
      return response.status(HttpStatus.OK).json(result);
    } catch (err) {
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: err });
    }
  }
}
