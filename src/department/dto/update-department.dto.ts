/* eslint-disable prettier/prettier */
import { IsString, IsNumber, IsOptional } from 'class-validator';

export class UpdateDepartDto {
  @IsString()
  @IsOptional()
  name: string;
  
  @IsString()
  @IsOptional()
  initials: string;

  @IsNumber()
  @IsOptional()
  availableSeats: number;

  @IsNumber()
  @IsOptional()
  occupiedSeats: number;

  @IsNumber()
  @IsOptional()
  batch: number;
}
