import { Field, InputType } from '@nestjs/graphql';
import { IsISO8601, IsString } from 'class-validator';

@InputType()
export class AppointmentInput {
  @Field()
  @IsString()
  readonly fk_patient: number;

  @Field()
  @IsISO8601()
  readonly appointment: string;

  @Field()
  readonly status: number;
}
