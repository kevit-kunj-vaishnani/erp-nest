/* eslint-disable prettier/prettier */
import { IsEmail, IsString, IsNumber } from 'class-validator';

export class CreateStudentDto {
  @IsString()
  name: string;
  
  @IsEmail()
  email: string;

  @IsString()
  role: string;

  @IsString()
  password: string;

  @IsNumber()
  sem: number;

  @IsNumber()
  phone: number;

  @IsString()
  departmentId: string;
}
