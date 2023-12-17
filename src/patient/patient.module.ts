import { Module } from '@nestjs/common';
import { PatientController } from './patient.controller';
import { PatientResolver } from './patient.resolver';

@Module({
  controllers: [PatientController],
  providers: [PatientResolver],
})
export class PatientModule {}
