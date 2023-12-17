import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppointmentModule } from './appointment/appointment.module';
import * as ormOptions from './database/config/orm';
import { PatientModule } from './patient/patient.module';
import RepoModule from './repo.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormOptions),
    AppointmentModule,
    RepoModule,
    PatientModule,
    UserModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      playground: true,
      installSubscriptionHandlers: true,
      context: ({ req }) => ({ req }),
      useGlobalPrefix: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
