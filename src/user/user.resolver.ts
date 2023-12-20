import { ConflictException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserEntity } from '../database/entities/user.entity';
import RepoService from '../repo.service';
import { UserArgs } from './graphql/user.args';
import { UserInput } from './graphql/user.input';

@Resolver('User')
export class UserResolver {
  constructor(private readonly repoService: RepoService) {}

  @Query(() => [UserEntity])
  async getUsers(@Args() args?: UserArgs): Promise<UserEntity[]> {
    return await this.repoService.userRepository.find({ where: args });
  }

  @Mutation(() => UserEntity)
  public async createUser(
    @Args('input') input: UserInput,
  ): Promise<UserEntity> {
    const userFind = await this.repoService.userRepository.findOne({
      where: { username: input.username },
    });

    if (!!userFind)
      throw new ConflictException('Já existe um usuario com este nome!');

    const userCreated = this.repoService.userRepository.create(input);
    await this.repoService.userRepository.save(userCreated);

    return userCreated;
  }
}
