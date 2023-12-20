import { Field, GraphQLISODateTime, ObjectType } from '@nestjs/graphql';
import { ApiResponseProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PatientEntity } from './patient.entity';

@ObjectType()
@Entity()
export class AppointmentEntity {
  @PrimaryGeneratedColumn()
  @Field({ nullable: true })
  id?: number;

  @Column({
    foreignKeyConstraintName: 'FK_appointments_patient_id',
    type: 'int',
  })
  @Field({ nullable: true })
  fk_patient: number;

  @Column({ type: 'datetime' })
  @Field(() => GraphQLISODateTime, { nullable: true })
  appointment: Date;

  @Column({ type: 'int' })
  @Field({ nullable: true })
  status: number;

  @ManyToOne(() => PatientEntity)
  @JoinColumn({ name: 'fk_patient' })
  patient?: PatientEntity;
}

export class AppointmentDeletedResponse {
  @ApiResponseProperty({
    example: 'Compromisso cancelado com suecesso!',
  })
  message: string;
}
