import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AppointmentEntity } from 'src/database/entities/appointment.entity';
import RepoService from 'src/repo.service';
import { AppointmentInput } from './appointment.input';

@Resolver('appointments')
export class AppointmentResolver {
  constructor(private readonly repoService: RepoService) {}
  @Query(() => [AppointmentEntity])
  async getAppointments(@Args('name', { type: () => String }) name?: string) {
    return await this.repoService.appointmentRepository.find();
  }

  @Mutation(() => AppointmentEntity)
  public async createAppointment(
    @Args('data') input: AppointmentInput,
  ): Promise<AppointmentEntity> {
    const appointmentCreated =
      this.repoService.appointmentRepository.create(input);
    await this.repoService.appointmentRepository.save(appointmentCreated);

    return appointmentCreated;
  }
}
