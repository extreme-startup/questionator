import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from '../../entity/Customer';

@Injectable()
export class CustomerService {
    constructor(
        @InjectRepository(Customer)
        private readonly photoRepository: Repository<Customer>,
    ) {}

    async findAll(): Promise<Customer[]> {
        return await this.photoRepository.find();
    }
}
