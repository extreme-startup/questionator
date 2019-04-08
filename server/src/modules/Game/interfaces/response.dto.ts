import { HttpStatus } from '@nestjs/common';

export interface ResponseDto<T> {
  error?: string;
  status?: HttpStatus;
  data: T;
}
