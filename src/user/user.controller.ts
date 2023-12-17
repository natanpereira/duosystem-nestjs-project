import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserEntity } from 'src/database/entities/user.entity';
import RepoService from 'src/repo.service';
import { UserInput } from './user.input';

@Controller('user')
export class UserController {
  constructor(private readonly repoService: RepoService) {}
  @Get()
  async getusers(): Promise<UserEntity[]> {
    return await this.repoService.userRepository.find();
  }

  @Post()
  async create(@Body() user: UserInput): Promise<UserInput> {
    return user;
  }
}
