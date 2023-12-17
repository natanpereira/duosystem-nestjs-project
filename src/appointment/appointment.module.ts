import { Module } from '@nestjs/common';
import { AppointmentController } from './appointment.controller';
import { AppointmentResolver } from './appointment.resolver';

@Module({
  controllers: [AppointmentController],
  providers: [AppointmentResolver],
})
export class AppointmentModule {}
