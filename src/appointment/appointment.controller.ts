import {
  Body,
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
import { AppointmentDeletedResponse } from '../database/entities/appointment.entity';
import RepoService from '../repo.service';
import { AppointmentInput } from './graphql/appointment.input';

@Controller('appointment')
@ApiTags('Appointment')
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class AppointmentController {
  constructor(private readonly repoService: RepoService) {}

  @Get()
  @ApiResponse({
    status: HttpStatus.ACCEPTED,
    type: [AppointmentInput],
  })
  async getAppointments(@Res() res: Response) {
    const result = await this.repoService.appointmentRepository.find();
    return res.status(HttpStatus.ACCEPTED).json(result);
  }

  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Appointment created successfully',
    type: AppointmentInput,
  })
  async createAppointment(
    @Body() model: AppointmentInput,
    @Res() res: Response,
  ) {
    const appointmentModel =
      this.repoService.appointmentRepository.create(model);
    await this.repoService.appointmentRepository.save(appointmentModel);

    return res.status(HttpStatus.CREATED).json(appointmentModel);
  }

  @Put(':appointmentid')
  @ApiResponse({
    status: 202,
    description: 'Appointment created successfully',
    type: AppointmentInput,
  })
  @ApiParam({
    name: 'appointmentid',
    description: 'Id do compromisso que será atualizado',
    example: 1,
    required: true,
    schema: { type: 'number' },
  })
  async updateAppointment(
    @Body() model: AppointmentInput,
    @Param('appointmentid') appointmentid: number,
    @Res() res: Response,
  ) {
    const appointmentFind =
      await this.repoService.appointmentRepository.findOneBy({
        id: appointmentid,
      });

    if (!appointmentFind)
      throw new NotFoundException(
        `Não Existe registro com este id: ${appointmentid} fornecido!`,
      );

    await this.repoService.appointmentRepository.update(appointmentFind, {
      ...model,
    });

    const appointmentPersisted =
      await this.repoService.appointmentRepository.findOneBy({
        id: appointmentid,
      });

    return res.status(HttpStatus.ACCEPTED).json(appointmentPersisted);
  }

  @Patch('cancel/:appointmentid')
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Compromisso cancelado com sucesso!',
    type: AppointmentDeletedResponse,
  })
  @ApiParam({
    name: 'appointmentid',
    description: 'Id do Compromisso que irá ser cancelado',
    example: 1,
    required: true,
    schema: { type: 'number' },
  })
  async cancelAppointment(
    @Param('appointmentid') appointmentid: number,
    @Res() res: Response,
  ) {
    await this.repoService.appointmentRepository.update(
      { id: appointmentid },
      { status: 0 },
    );

    return res.status(HttpStatus.NO_CONTENT).json(null);
  }
}
