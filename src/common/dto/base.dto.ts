// src/common/dto/base.dto.ts
import { IsOptional, IsDate } from 'class-validator';

export class BaseDto {
  @IsOptional()
  @IsDate()
  created?: Date;

  @IsOptional()
  @IsDate()
  updated?: Date;
}
