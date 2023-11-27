/* eslint-disable prettier/prettier */
import { IsString, IsBoolean, IsOptional } from 'class-validator';

export class UpdateAttendanceDto {

    @IsOptional()
    @IsString()
    studentId: string;
    
    @IsOptional()
    @IsString()
    date: Date;
  
    @IsOptional()
    @IsBoolean()
    isPresent: boolean;
  }