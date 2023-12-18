import { Field, ID, ObjectType } from '@nestjs/graphql';
import { GraphQLString } from 'graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class UserEntity {
  @Field(() => ID, { nullable: true })
  @PrimaryGeneratedColumn({ primaryKeyConstraintName: 'PK_USER', type: 'int' })
  id?: number;

  @Field(() => GraphQLString, { nullable: true })
  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
    comment: 'String contendo alias do usuario',
  })
  username?: string;

  @Field(() => GraphQLString, { nullable: true })
  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
    comment: 'String contendo a senha do usuario',
  })
  password?: string;
}
