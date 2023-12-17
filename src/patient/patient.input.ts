import { Field, GraphQLISODateTime, InputType } from '@nestjs/graphql';
import { Length } from 'class-validator';
import { GraphQLString } from 'graphql';

@InputType()
export class PatientInput {
  @Field(() => GraphQLString)
  @Length(2, 50)
  readonly name: string;

  @Field(() => GraphQLString)
  readonly email: string;

  @Field(() => GraphQLString)
  readonly cpf: string;

  @Field(() => GraphQLISODateTime, { nullable: true })
  readonly deleted_at?: Date;

  @Field(() => [GraphQLString], { nullable: true })
  readonly medicalHistory?: string[];
}
