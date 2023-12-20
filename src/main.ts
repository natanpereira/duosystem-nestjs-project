import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as csurf from 'csurf';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Nestjs DuoSystem Test')
    .setDescription(
      'Descrição e testes de requisição para os serviços referente ao teste Nestjs Duosystem.\nFoi Utilizado o framework Nestjs, com GraphQL para Mutations e Queries.\nPara todas entidades abaixo também encontra-se disponivel requisições REST',
    )
    .setContact(': Send E-mail', '', 'natanj49@gmail.com')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  app.useGlobalPipes(new ValidationPipe());
  app.use(csurf());

  const port = 3000;
  await app.listen(port);
  console.log(`This app is listening on port: ${port}`);
}
bootstrap();
