import { Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from '../../entity/Users';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
  ) {}

  async findAll(): Promise<Users[]> {
    return await this.userRepository.find();
  }

  async validateUser({email}): Promise<any> {
    return await this.userRepository.findOne({ email });
  }

  async createUser(user): Promise<any> {
    return await this.userRepository.save(user);
  }
}
