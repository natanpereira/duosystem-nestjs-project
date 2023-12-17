import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserEntity } from 'src/database/entities/user.entity';
import RepoService from 'src/repo.service';
import { UserInput } from './user.input';

@Resolver('User')
export class UserResolver {
  constructor(private readonly repoService: RepoService) {}

  @Query(() => [UserEntity])
  async getUsers(
    @Args('username', { type: () => String }) username?: string,
  ): Promise<UserEntity[]> {
    return await this.repoService.userRepository.find();
  }

  @Mutation(() => UserEntity)
  public async createUser(@Args('data') input: UserInput): Promise<UserEntity> {
    const userCreated = this.repoService.userRepository.create(input);
    await this.repoService.userRepository.save(userCreated);

    return userCreated;
  }
}
