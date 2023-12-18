import { ConflictException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PatientEntity } from 'src/database/entities/patient.entity';
import RepoService from 'src/repo.service';
import { PatientArgs } from './graphql/patient.args';
import { PatientInput } from './graphql/patient.input';

@Resolver('patients')
export class PatientResolver {
  constructor(private readonly repoService: RepoService) {}
  @Query(() => [PatientEntity])
  async getPatients(@Args() args?: PatientArgs) {
    return await this.repoService.patientRepository.find({
      where: args,
      relations: { appointment: true },
    });
  }

  @Mutation(() => PatientEntity)
  public async createPatient(
    @Args('input') input: PatientInput,
  ): Promise<PatientEntity> {
    const patientFind = await this.repoService.userRepository.findOne({
      where: { username: input.cpf },
    });

    if (!!patientFind)
      throw new ConflictException(
        'Já existe um paciente cadastrado com este CPF!',
      );

    const patientCreated = this.repoService.patientRepository.create(input);
    await this.repoService.patientRepository.save(patientCreated);

    return patientCreated;
  }
}
