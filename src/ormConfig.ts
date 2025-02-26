import { join } from 'path';
import process from 'process';
import { DataSource } from 'typeorm';
console.log({ process });
const relativePath = 'src'; //relative(process?.cwd(), __dirname);

console.log({
  relativePath,
  path: join(__dirname, 'db', 'entity', '*.{ts,js}'),
});

export const appDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3307,
  username: 'root',
  password: 'mypass',
  database: 'posDB',
  // entities: [`${relativePath}/db/entity/*{.ts,.js}`],
  entities: [join(__dirname, 'db', 'entity', '*.entity.{ts,js}')],
  synchronize: true, // Set to false in production
  logging: true,
  // migrations: ['src/migration/*{.ts,.js}'],
  migrations: [join(__dirname, 'migration', '*.{ts,js}')],
});
