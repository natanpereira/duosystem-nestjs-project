import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AppointmentModel {
  @Field({ nullable: true })
  id: number;

  @Field({ nullable: true })
  fk_patient: string;

  @Field({ nullable: true })
  appointment: string;

  @Field({ nullable: true })
  status: string;
}
