/* eslint-disable prettier/prettier */
import { IsString, IsBoolean } from 'class-validator';

export class CreateAttendanceDto {
  @IsString()
  studentId: string;
  
  @IsString()
  date: Date;

  @IsBoolean()
  isPresent: boolean;
}
