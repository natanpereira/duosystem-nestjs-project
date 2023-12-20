import { ArgsType, Field, GraphQLISODateTime, ID } from '@nestjs/graphql';
import { GraphQLString } from 'graphql';

@ArgsType()
export class PatientArgs {
  @Field(() => ID, { nullable: true })
  readonly id?: number;

  @Field(() => GraphQLString, { nullable: true })
  readonly name?: string;

  @Field(() => GraphQLString, { nullable: true })
  readonly email?: string;

  @Field(() => GraphQLString, { nullable: true })
  readonly cpf?: string;

  @Field(() => GraphQLISODateTime, { nullable: true })
  readonly deleted_at?: Date;
}
