import { HttpStatus, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Response } from 'express';
import { AppModule } from '../app.module';
import { AppointmentEntity } from '../database/entities/appointment.entity';
import RepoService from '../repo.service';
import { AppointmentController } from './appointment.controller';
import { AppointmentInput } from './graphql/appointment.input';

describe('AppointmentController', () => {
  let controller: AppointmentController;
  let repoService: RepoService;

  beforeEach(async () => {
    jest.setTimeout(40000);
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    controller = moduleFixture.get<AppointmentController>(
      AppointmentController,
    );
    repoService = moduleFixture.get<RepoService>(RepoService);
  });

  const mockAppointmentInput: AppointmentInput = {
    appointment: new Date(),
    fk_patient: 2,
    status: 1,
  };

  const mockAppointmentModel: AppointmentEntity = {
    appointment: new Date(),
    fk_patient: 2,
    status: 1,
  };

  const mockAppointmentId = 7;

  const mockResponse = {
    status: jest.fn((status: HttpStatus) => ({
      json: (result: any) => result,
    })),
  } as unknown as Response;

  it('should return an array of appointments', async () => {
    const mockAppointments: AppointmentEntity[] = [];

    jest
      .spyOn(repoService.appointmentRepository, 'find')
      .mockResolvedValue(mockAppointments);

    const result = await controller.getAppointments(mockResponse);

    expect(result).toEqual(mockAppointments);
  });

  it('should create a new appointment', async () => {
    jest
      .spyOn(repoService.appointmentRepository, 'create')
      .mockReturnValue(mockAppointmentModel);
    jest
      .spyOn(repoService.appointmentRepository, 'save')
      .mockResolvedValue(mockAppointmentModel);

    const result = await controller.createAppointment(
      mockAppointmentInput,
      mockResponse,
    );

    expect(result).toEqual(mockAppointmentModel);
    expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.CREATED);
  });

  it('should update an appointment and return HTTP status 202', async () => {
    jest
      .spyOn(repoService.appointmentRepository, 'findOneBy')
      .mockResolvedValue(mockAppointmentModel);
    jest
      .spyOn(repoService.appointmentRepository, 'update')
      .mockResolvedValue({} as any);
    jest
      .spyOn(repoService.appointmentRepository, 'findOneBy')
      .mockResolvedValue(mockAppointmentModel);

    await controller.updateAppointment(
      mockAppointmentInput,
      mockAppointmentId,
      mockResponse,
    );

    expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.ACCEPTED);
  });

  it('should throw NotFoundException for non-existing appointment during update', async () => {
    jest
      .spyOn(repoService.appointmentRepository, 'findOneBy')
      .mockResolvedValue(null);

    await expect(
      controller.updateAppointment(
        mockAppointmentInput,
        mockAppointmentId,
        mockResponse,
      ),
    ).rejects.toThrow(NotFoundException);
  });

  it('should cancel an appointment and return HTTP status 204', async () => {
    jest
      .spyOn(repoService.appointmentRepository, 'update')
      .mockResolvedValue({ affected: 1 } as any);

    await controller.cancelAppointment(mockAppointmentId, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.NO_CONTENT);
  });
});
