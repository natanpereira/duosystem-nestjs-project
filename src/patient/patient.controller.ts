import {
  Body,
  ConflictException,
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { AuthGuard } from '../auth/auth.guard';
import { PatientDeletedResponse } from '../database/entities/patient.entity';
import RepoService from '../repo.service';
import { PatientInput } from './graphql/patient.input';
import { PatientTransform } from './patient.transform';

@Controller('patient')
@ApiTags('Patient')
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class PatientController {
  constructor(private readonly repoService: RepoService) {}

  @Get()
  async getPatients() {
    return await this.repoService.patientRepository.find({
      relations: { appointment: true },
    });
  }

  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Paciente criado com sucesso!',
    type: PatientInput,
  })
  async createPatient(
    @Body(PatientTransform) model: PatientInput,
    @Res() res: Response,
  ) {
    const patientFind = await this.repoService.patientRepository.findOne({
      where: { cpf: model.cpf },
    });

    if (!!patientFind)
      throw new ConflictException(
        'Já existe um paciente cadastrado com este CPF!',
      );
    const patientModel = this.repoService.patientRepository.create(model);
    await this.repoService.patientRepository.save(patientModel);

    return res.status(HttpStatus.CREATED).json(patientModel);
  }

  @Put(':patientid')
  @ApiResponse({
    status: 202,
    description: 'Paciente atualizado com sucesso!',
    type: PatientInput,
  })
  @ApiParam({
    name: 'patientid',
    description: 'Id do paciente que será atualizado',
    example: 1,
    required: true,
    schema: { type: 'number' },
  })
  async updatePatient(
    @Body(PatientTransform) model: PatientInput,
    @Param('patientid') patientid: number,
    @Res() res: Response,
  ) {
    const patientFind = await this.repoService.patientRepository.findOneBy({
      id: patientid,
    });

    if (!patientFind)
      throw new NotFoundException(
        `Não Existe um paciente cadastrado com este id: ${patientid}!`,
      );

    await this.repoService.patientRepository.update(
      { id: patientid },
      { ...model },
    );

    const patientPersisted = await this.repoService.patientRepository.findOneBy(
      { id: patientid },
    );

    return res.status(HttpStatus.ACCEPTED).json(patientPersisted);
  }

  @Patch('delete/:patientid')
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Paciente excluido com sucesso!',
    type: PatientDeletedResponse,
  })
  @ApiParam({
    name: 'patientid',
    description: 'Id do paciente que irá sofrer exclusão(soft-delete)',
    example: 1,
    required: true,
    schema: { type: 'number' },
  })
  async deletePatient(
    @Param('patientid') patientid: number,
    @Res() res: Response,
  ) {
    const patientFind = await this.repoService.patientRepository.findOneBy({
      id: patientid,
    });

    if (!patientFind)
      throw new NotFoundException(
        `Não Existe um paciente cadastrado com este id: ${patientid}!`,
      );

    await this.repoService.patientRepository.softDelete(patientid);

    return res
      .status(HttpStatus.NO_CONTENT)
      .json('Paciente excluido com sucesso!');
  }
}
