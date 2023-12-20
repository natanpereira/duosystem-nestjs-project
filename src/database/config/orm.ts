import { TypeOrmModule } from '@nestjs/typeorm';
import * as path from 'path';

const options: TypeOrmModule = {
  type: 'sqlite',
  database: 'data/database.db',
  logging: true,
  synchronize: true,
  entities: [path.resolve(__dirname, '..', 'entities', '*.entity.{ts,js}')],
};

module.exports = options;
