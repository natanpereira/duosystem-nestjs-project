import { Post } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserModel } from './user.model';
import { UserService } from './user.service';

@Resolver((of) => UserModel)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => String)
  sayHello(): string {
    return 'Hello World!';
  }
  @Query((returns) => UserModel)
  async author(@Args('username', { type: () => String }) username: string) {
    return this.userService.findOne(username);
  }

  @Mutation((returns) => Post)
  async upvotePost(@Args({ name: 'postId', type: () => Int }) postId: number) {
    // return this.userService.upvoteById({ id: postId });
  }
}
