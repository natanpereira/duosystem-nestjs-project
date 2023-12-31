import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsStrongPassword,
  Length,
  ValidateIf,
} from 'class-validator';
import { GraphQLString } from 'graphql';

@InputType()
export class UserInput {
  @ApiProperty({
    description: 'Nome do usuario',
    example: 'newuser',
    required: true,
  })
  @Field(() => GraphQLString, { nullable: true })
  @IsString()
  @Length(2, 50)
  readonly username: string;

  @ApiProperty({
    description: 'Senha do usuario',
    example: 'Strong@123!',
    required: true,
  })
  @Field(() => GraphQLString, { nullable: true })
  @IsString()
  @ValidateIf((o, value) => value !== undefined)
  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    },
    {
      message:
        'A senha deve conter pelo menos 8 caracteres, incluindo 1 maiúscula, 1 minúscula, 1 número e 1 símbolo.',
    },
  )
  @Length(0, 50)
  readonly password: string;
}
