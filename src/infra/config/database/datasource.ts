import 'dotenv/config';
import { DataSource } from 'typeorm';

const entitiesPattern = '/../../**/*.entity{.ts,.js}';

const AppDataSource = new DataSource({
  entities: [__dirname + entitiesPattern],
  logging: true,
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
  synchronize: false,
  type: 'postgres',
  url: process.env.DATABASE_URL,
});

export default AppDataSource;
