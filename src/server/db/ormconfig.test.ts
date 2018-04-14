import {ConnectionOptions} from 'typeorm';

export default {
  type: 'postgres',
  name: 'test',
  database: 'webapp_starter_test',
  uri: 'postgres://can@localhost:5432/webapp_starter_test',
  entities: [
    'src/server/models/**/*.ts',
  ],
  migrations: [
    'src/server/db/migrations/**/*.ts',
  ],
  migrationsRun: true,
  synchronize: true,
  logging: true,
} as ConnectionOptions;
