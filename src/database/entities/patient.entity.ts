import { Field, GraphQLISODateTime, ID, ObjectType } from '@nestjs/graphql';
import { ApiResponseProperty } from '@nestjs/swagger';
import { GraphQLString } from 'graphql';
import {
  Column,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AppointmentEntity } from './appointment.entity';

@ObjectType()
@Entity()
export class PatientEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID, { nullable: true })
  id?: number;

  @Column({ type: 'varchar', length: '50' })
  @Field(() => GraphQLString, { nullable: true })
  name?: string;

  @Column({ type: 'varchar', length: '100' })
  @Field(() => GraphQLString, { nullable: true })
  email?: string;

  @Column({ type: 'varchar', length: '11' })
  @Field(() => GraphQLString, { nullable: true })
  cpf?: string;

  @DeleteDateColumn()
  @Field(() => GraphQLISODateTime, { nullable: true })
  deleted_at?: Date;

  //TODO: Implement this method
  // @Column({ nullable: true })
  // @Field({ nullable: true, defaultValue: [] })
  // medicalHIstory?: string;

  @OneToMany(() => AppointmentEntity, (appointment) => appointment.patient)
  @Field(() => [AppointmentEntity], { nullable: true })
  appointment?: AppointmentEntity[];
}

export class PatientDeletedResponse {
  @ApiResponseProperty({
    example: 'Paciente excluido com suecesso!',
  })
  message: string;
}
