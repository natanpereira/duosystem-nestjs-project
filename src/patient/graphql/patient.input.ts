import { Field, GraphQLISODateTime, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsISO8601,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { GraphQLString } from 'graphql';

@InputType()
export class PatientInput {
  @ApiProperty({
    description: 'Nome do paciente',
    example: 'Dirceu Valença',
    required: true,
  })
  @Field(() => GraphQLString)
  @IsNotEmpty()
  @Length(2, 50)
  readonly name: string;

  @ApiProperty({
    description: 'Email válido do paciente',
    example: 'dirceu.valenca@dev.com',
    required: true,
  })
  @Field(() => GraphQLString)
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @Length(10, 100)
  readonly email: string;

  @ApiProperty({
    description: 'Cpf do paciente',
    example: '24540896024',
    required: true,
  })
  @Field(() => GraphQLString)
  readonly cpf: string;

  @Field(() => GraphQLISODateTime, { nullable: true })
  @IsOptional()
  @IsISO8601()
  readonly deleted_at?: Date;
  //TODO: imoplement this method
  // @ApiPropertyOptional({
  //   description: 'Historico do paciente',
  //   example: [{ teste: 1 }],
  //   required: false,
  // })
  // @Field(() => [GraphQLString], { nullable: true, defaultValue: [] })
  // @IsOptional()
  // @IsArray()
  // readonly medicalHistory?: string[];
}
