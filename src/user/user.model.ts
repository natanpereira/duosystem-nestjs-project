import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserModel {
  @Field((type) => Int)
  id: number;

  @Field({ nullable: true })
  username?: string;

  @Field({ nullable: true })
  password?: string;
}
