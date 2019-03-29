import { Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entity/User';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async validateUser({email}): Promise<any> {
    return await this.userRepository.findOne({ email });
  }

  async createUser(user): Promise<any> {
    return await this.userRepository.save(user);
  }
}
