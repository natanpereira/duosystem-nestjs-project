import { Field, ID, ObjectType } from '@nestjs/graphql';
import { GraphQLString } from 'graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class UserEntity {
  @Field(() => ID, { nullable: true })
  @PrimaryGeneratedColumn()
  id?: number;

  @Field(() => GraphQLString, { nullable: true })
  @Column()
  username?: string;

  @Field(() => GraphQLString, { nullable: true })
  @Column()
  password?: string;
}
