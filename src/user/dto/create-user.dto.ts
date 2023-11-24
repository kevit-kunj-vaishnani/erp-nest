/* eslint-disable prettier/prettier */
import { IsEmail, IsString, IsNumber } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;
  
  @IsEmail()
  email: string;

  @IsString()
  role: string;

  @IsString()
  password: string;

  @IsString()
  designation: string;

  @IsNumber()
  phone: number;

  @IsString()
  departmentId: string;
}
