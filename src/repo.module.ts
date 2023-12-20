import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentEntity } from './database/entities/appointment.entity';
import { PatientEntity } from './database/entities/patient.entity';
import { UserEntity } from './database/entities/user.entity';
import RepoService from './repo.service';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    TypeOrmModule.forFeature([PatientEntity]),
    TypeOrmModule.forFeature([AppointmentEntity]),
  ],
  providers: [RepoService],
  exports: [RepoService],
})
class RepoModule {}
export default RepoModule;
