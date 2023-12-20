import {
  Body,
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { AuthGuard } from '../auth/auth.guard';
import { UserEntity } from '../database/entities/user.entity';
import RepoService from '../repo.service';
import { UserInput } from './graphql/user.input';

@Controller('user')
@ApiTags('User')
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class UserController {
  constructor(private readonly repoService: RepoService) {}

  @Get()
  @ApiResponse({
    status: HttpStatus.ACCEPTED,
    type: [UserEntity],
  })
  async getusers(@Res() res: Response) {
    const result = await this.repoService.userRepository.find();
    return res.status(HttpStatus.ACCEPTED).json(result);
  }

  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Usuario criado com sucesso!',
    type: UserInput,
  })
  async createUser(@Body() model: UserInput, @Res() res: Response) {
    const userModel = this.repoService.userRepository.create(model);
    await this.repoService.userRepository.save(userModel);
    return res.status(HttpStatus.CREATED).json(userModel);
  }

  @Put(':userid')
  @ApiResponse({
    status: HttpStatus.ACCEPTED,
    description: 'Usuario atualizado com sucesso!',
    type: UserInput,
  })
  @ApiParam({
    name: 'userid',
    description: 'Id do usuario que será atualizado',
    example: 1,
    required: true,
    schema: { type: 'number' },
  })
  async updateUser(
    @Body() model: UserInput,
    @Param('userid') userid: number,
    @Res() res: Response,
  ) {
    const userFind = await this.repoService.userRepository.findOneBy({
      id: userid,
    });

    if (!userFind)
      throw new NotFoundException(
        `Não Existe um usuario cadastrado com este id: ${userid}!`,
      );

    await this.repoService.userRepository.update(userFind, { ...model });

    const userPersisted = await this.repoService.userRepository.findOneBy({
      id: userid,
    });

    return res.status(HttpStatus.ACCEPTED).json(userPersisted);
  }
}
