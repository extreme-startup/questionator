import { Module } from '@nestjs/common';
import { ContenderGateway } from './contender.gateway';

@Module({
  providers: [ContenderGateway],
})
export class ContenderModule {}
