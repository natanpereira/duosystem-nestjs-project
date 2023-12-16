import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PatientModel {
  @Field({ nullable: true })
  id: number;

  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  email: string;

  @Field({ nullable: true })
  cpf: string;

  @Field({ nullable: true })
  deleted_at: Date;

  @Field({ nullable: true, defaultValue: null })
  medicalHistory: string[];
}
