import { Injectable, NotFoundException } from '@nestjs/common';

import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/entity.user';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  /* Сохранение нового юзера */
  async create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create({ ...createUserDto });

    return this.userRepository.save(user);
  }

  /* Поиск юзера по email */
  async findOneByEmail(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });

    return user;
  }

  /* Очишение всей таблицы User, использовать только в dev режиме и только при тестах! */
  async clearUserTable() {
    await this.userRepository.clear();
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`There is no user under id ${id}`);
    }

    return user;
  }
}
