import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateUserDTO
{
  @IsOptional()
  @IsNumber()
  id: number;

  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsNumber()
  lastName?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  password?: string;

  @IsOptional()
  @IsBoolean()
  status?: boolean;
}

