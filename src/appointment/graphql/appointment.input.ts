import { Field, GraphQLISODateTime, InputType, Int } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsISO8601, IsIn, IsInt, IsNotEmpty, IsNumber } from 'class-validator';

@InputType()
export class AppointmentInput {
  @ApiProperty({
    description: 'ID do paciente',
    example: 1,
    required: true,
  })
  @Field(() => Int, { nullable: true })
  @IsInt()
  @IsNotEmpty()
  fk_patient: number;

  @ApiProperty({
    description: 'Data do compromisso',
    example: '2023-12-01',
    required: true,
  })
  @Field(() => GraphQLISODateTime, { nullable: true })
  @IsISO8601()
  @IsNotEmpty()
  readonly appointment: Date;

  @ApiProperty({
    description:
      'Satatus do compromisso. 1 - disponivel, 2 - agendado, 0 - cancelado',
    example: 1,
    required: true,
  })
  @Field(() => Int, { nullable: true })
  @IsNotEmpty()
  @IsNumber()
  @IsIn([0, 1, 2])
  status: number;
}
