import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PatientEntity } from 'src/database/entities/patient.entity';
import RepoService from 'src/repo.service';
import { PatientInput } from './patient.input';

@Resolver('patients')
export class PatientResolver {
  constructor(private readonly repoService: RepoService) {}
  @Query(() => [PatientEntity])
  async getPatients(@Args('name', { type: () => String }) name?: string) {
    return await this.repoService.patientRepository.find();
  }

  @Mutation(() => PatientEntity)
  public async createPatient(
    @Args('data') input: PatientInput,
  ): Promise<PatientEntity> {
    const patientCreated = this.repoService.patientRepository.create(input);
    await this.repoService.patientRepository.save(patientCreated);

    return patientCreated;
  }
}
