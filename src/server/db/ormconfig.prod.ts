import {ConnectionOptions} from 'typeorm';

export default {
  type: 'postgres',
  name: 'development',
  database: 'webapp_starter_dev',
  uri: 'postgres://can@localhost:5432/webapp_starter_dev',
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
