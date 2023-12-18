import { ArgsType, Field, GraphQLISODateTime, Int } from '@nestjs/graphql';

@ArgsType()
export class AppointmentArgs {
  @Field(() => Int, { nullable: true })
  readonly fk_patient?: number;

  @Field(() => GraphQLISODateTime, { nullable: true })
  readonly appointment?: Date;

  @Field(() => Int, { nullable: true })
  readonly status?: number;
}
