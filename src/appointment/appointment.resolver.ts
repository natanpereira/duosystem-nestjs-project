import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AppointmentEntity } from 'src/database/entities/appointment.entity';
import RepoService from 'src/repo.service';
import { AppointmentArgs } from './graphql/appointment.args';
import { AppointmentInput } from './graphql/appointment.input';

@Resolver('appointments')
export class AppointmentResolver {
  constructor(private readonly repoService: RepoService) {}
  @Query(() => [AppointmentEntity])
  async getAppointments(@Args() args?: AppointmentArgs) {
    return await this.repoService.appointmentRepository.find({
      where: args,
    });
  }

  @Mutation(() => AppointmentEntity)
  public async createAppointment(
    @Args('input') input: AppointmentInput,
  ): Promise<AppointmentEntity> {
    const appointmentCreated =
      this.repoService.appointmentRepository.create(input);
    await this.repoService.appointmentRepository.save(appointmentCreated);

    return appointmentCreated;
  }
}
