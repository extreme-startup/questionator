import { Controller, Get } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { CustomerService } from './customer.service';
import { Customer } from '../../entities/Customer';

@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get()
  @ApiResponse({ status: 200, type: Customer, isArray: true })
  findAll(): Promise<Customer[]> {
    return this.customerService.findAll();
  }
}
