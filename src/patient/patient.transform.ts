import { Injectable, PipeTransform } from '@nestjs/common';
import { PatientInput } from './graphql/patient.input';

@Injectable()
export class PatientTransform implements PipeTransform {
  transform(model: PatientInput) {
    model.cpf.replace(/[^\d]/g, '');
    return model;
  }
}
