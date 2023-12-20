import {
  ConflictException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Response } from 'express';
import { AppModule } from '../app.module';
import { PatientEntity } from '../database/entities/patient.entity';
import RepoService from '../repo.service';
import { PatientInput } from './graphql/patient.input';
import { PatientController } from './patient.controller';

describe('PatientController', () => {
  let controller: PatientController;
  let repoService: RepoService;

  beforeEach(async () => {
    jest.setTimeout(40000);
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    controller = moduleFixture.get<PatientController>(PatientController);
    repoService = moduleFixture.get<RepoService>(RepoService);
  });

  const mockPatientInput: PatientInput = {
    name: 'Patient Mock',
    email: 'mock@example.com',
    cpf: '12345678901',
  };

  const mockPatientModel: PatientEntity = {
    name: 'Patient Mock',
    email: 'mock@example.com',
    cpf: '12345678901',
  };

  const mockPatientId = 1;

  const mockResponse = {
    status: jest.fn((status: HttpStatus) => ({
      json: (result: any) => result,
    })),
  } as unknown as Response;

  it('should return an array of patients', async () => {
    const mockPatients: PatientEntity[] = [];

    jest
      .spyOn(repoService.patientRepository, 'find')
      .mockResolvedValue(mockPatients);

    const result = await controller.getPatients();

    expect(result).toEqual(mockPatients);
  });

  it('should create a new patient', async () => {
    jest
      .spyOn(repoService.patientRepository, 'findOne')
      .mockResolvedValue(null);
    jest
      .spyOn(repoService.patientRepository, 'create')
      .mockReturnValue(mockPatientModel);
    jest
      .spyOn(repoService.patientRepository, 'save')
      .mockResolvedValue(mockPatientModel);

    const result = await controller.createPatient(
      mockPatientInput,
      mockResponse,
    );

    expect(result).toEqual(mockPatientModel);
    expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.CREATED);
  });

  it('should throw ConflictException for existing patient during creation', async () => {
    jest
      .spyOn(repoService.patientRepository, 'findOne')
      .mockResolvedValue(mockPatientModel);

    await expect(
      controller.createPatient(mockPatientInput, mockResponse),
    ).rejects.toThrow(ConflictException);
  });

  it('should update a patient and return HTTP status 202', async () => {
    jest
      .spyOn(repoService.patientRepository, 'findOneBy')
      .mockResolvedValue(mockPatientModel);
    jest
      .spyOn(repoService.patientRepository, 'update')
      .mockResolvedValue({} as any);
    jest
      .spyOn(repoService.patientRepository, 'findOneBy')
      .mockResolvedValue(mockPatientModel);

    await controller.updatePatient(
      mockPatientInput,
      mockPatientId,
      mockResponse,
    );

    expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.ACCEPTED);
  });

  it('should throw NotFoundException for non-existing patient during update', async () => {
    jest
      .spyOn(repoService.patientRepository, 'findOneBy')
      .mockResolvedValue(null);

    await expect(
      controller.updatePatient(mockPatientInput, mockPatientId, mockResponse),
    ).rejects.toThrow(NotFoundException);
  });

  it('should delete a patient and return HTTP status 204', async () => {
    jest
      .spyOn(repoService.patientRepository, 'findOneBy')
      .mockResolvedValue(mockPatientModel);
    jest
      .spyOn(repoService.patientRepository, 'softDelete')
      .mockResolvedValue({ affected: 1 } as any);

    await controller.deletePatient(mockPatientId, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.NO_CONTENT);
  });

  it('should throw NotFoundException for non-existing patient during delete', async () => {
    jest
      .spyOn(repoService.patientRepository, 'findOneBy')
      .mockResolvedValue(null);

    await expect(
      controller.deletePatient(mockPatientId, mockResponse),
    ).rejects.toThrow(NotFoundException);
  });
});
