import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppointmentEntity } from './database/entities/appointment.entity';
import { PatientEntity } from './database/entities/patient.entity';
import { UserEntity } from './database/entities/user.entity';

@Injectable()
class RepoService {
  public constructor(
    @InjectRepository(UserEntity)
    public readonly userRepository: Repository<UserEntity>,
    @InjectRepository(PatientEntity)
    public readonly patientRepository: Repository<PatientEntity>,
    @InjectRepository(AppointmentEntity)
    public readonly appointmentRepository: Repository<AppointmentEntity>,
  ) {}
}

export default RepoService;
