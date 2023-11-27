/* eslint-disable prettier/prettier */
import { IsString, IsNumber } from 'class-validator';

export class CreateDepartmentDto {
  @IsString()
  name: string;
  
  @IsString()
  initials: string;

  @IsNumber()
  availableSeats: number;

  @IsNumber()
  occupiedSeats: number;

  @IsNumber()
  batch: number;
}
