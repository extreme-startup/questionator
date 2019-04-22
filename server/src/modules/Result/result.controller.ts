import {Controller, Get, HttpStatus, Response, Query, Param} from '@nestjs/common';
import { ResultService } from './result.service';
import { AskedQuestion } from '../../entity/AskedQuestion';
import { ApiResponse, ApiOperation, ApiImplicitQuery} from '@nestjs/swagger';

@Controller('results')
export class ResultController {
  constructor(private readonly resultLoggerService: ResultService) {}

  @Get()
  @ApiOperation({ title: 'Result Logger', description: 'Get All Results' })
  @ApiResponse({ status: 200, type: AskedQuestion, isArray: true })
  async findAll(
    @Response() response,
  ): Promise<AskedQuestion[]> {
    try {
      const result = await this.resultLoggerService
        .getAllResults();
      return response.status(HttpStatus.OK).json(result);
    } catch (err) {
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: err });
    }
  }

  @Get(':id')
  @ApiOperation({ title: 'Result Logger', description: 'Get Session Results by sessionId with filter by time' })
  @ApiResponse({ status: 200, type: AskedQuestion, isArray: true })
  @ApiImplicitQuery({ name: 'time', description: 'Time filter (more than) in milliseconds'})
  @ApiImplicitQuery({ name: 'userId', description: 'Current userId'})
  async findAllResults(
    @Response() response,
    @Param('id') id: string,
    @Query() query,
  ): Promise<AskedQuestion[]> {
    try {
      const { time, userId } = query;
      const result = await this.resultLoggerService
        .getAllResults(id, parseInt(time, 10), userId);
      return response.status(HttpStatus.OK).json(result);
    } catch (err) {
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: err });
    }
  }
}
