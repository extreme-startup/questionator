import { Controller, Get } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { Customer } from '../../entity/Customer';

@Controller('customers')
export class CustomerController {
    constructor(private readonly customerService: CustomerService) {}

    @Get()
    findAll(): Promise<Customer[]> {
        return this.customerService.findAll();
    }
}
