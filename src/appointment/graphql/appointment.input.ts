import { Field, GraphQLISODateTime, InputType, Int } from '@nestjs/graphql';
import { IsISO8601, IsIn, IsInt, IsNotEmpty, IsNumber } from 'class-validator';

@InputType()
export class AppointmentInput {
  @Field(() => Int, { nullable: true })
  @IsInt()
  @IsNotEmpty()
  readonly fk_patient: number;

  @Field(() => GraphQLISODateTime, { nullable: true })
  @IsISO8601()
  @IsNotEmpty()
  readonly appointment: string;

  @Field(() => Int, { nullable: true })
  @IsNotEmpty()
  @IsNumber()
  @IsIn([0, 1, 2])
  readonly status: number;
}
