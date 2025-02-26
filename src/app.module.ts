import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { appDataSource } from './ormConfig';
import {
  UsersModule,
} from './modules';
@Module({
  imports: [
    TypeOrmModule.forRoot(appDataSource.options),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
