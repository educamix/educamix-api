import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../dto/users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(user);
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: string): Promise<User> {
    return this.usersRepository.findOne({ where: { id: +id } });
  }

  update(id: string, updateUserDto: CreateUserDto): Promise<void> {
    return this.usersRepository.update(id, updateUserDto).then(() => {});
  }

  remove(id: string): Promise<void> {
    return this.usersRepository.delete(id).then(() => {});
  }
}
