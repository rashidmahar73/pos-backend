import { join } from 'path';
import process from 'process';
import { DataSource } from 'typeorm';
console.log({ process });
const relativePath = 'src'; //relative(process?.cwd(), __dirname);

console.log({
  relativePath,
  path: join(__dirname, 'db', 'entity', '*.{ts,js}'),
});

// posDb db name
// posUser username
// posUser123 password

// u316081972_posDb dbname
// u316081972_posUser username
// 127.0.0.1:3306 host address

export const appDataSource = new DataSource({
  type: 'mysql',
  host: '127.0.0.1:3306',
  port: 3307,
  username: 'u316081972_posDb',
  password: 'posUser123',
  database: 'u316081972_posDb',
  // entities: [`${relativePath}/db/entity/*{.ts,.js}`],
  entities: [join(__dirname, 'db', 'entity', '*.entity.{ts,js}')],
  synchronize: true, // Set to false in production
  logging: true,
  // migrations: ['src/migration/*{.ts,.js}'],
  migrations: [join(__dirname, 'migration', '*.{ts,js}')],
});
