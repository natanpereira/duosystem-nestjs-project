import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { UserEntity } from 'src/database/entities/user.entity';
import RepoService from 'src/repo.service';
import { UserInput } from './graphql/user.input';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private readonly repoService: RepoService) {}
  @Get()
  async getusers(): Promise<UserEntity[]> {
    return await this.repoService.userRepository.find();
  }

  @Post()
  @ApiResponse({
    status: HttpStatus.ACCEPTED,
    description: 'Patient created successfully',
    type: UserInput,
  })
  async createUser(@Body() model: UserInput, @Res() res: Response) {
    const userModel = this.repoService.userRepository.create(model);
    await this.repoService.userRepository.save(userModel);
    return res.status(HttpStatus.ACCEPTED).json(userModel);
  }
}
