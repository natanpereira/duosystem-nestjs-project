import { ArgsType, Field, ID } from '@nestjs/graphql';
import { GraphQLString } from 'graphql';

@ArgsType()
export class UserArgs {
  @Field(() => ID, { nullable: true })
  readonly id?: number;

  @Field(() => GraphQLString, { nullable: true })
  readonly username?: string;
}
