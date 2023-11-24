/* eslint-disable prettier/prettier */
import { IsEmail, IsString, IsNumber, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  name: string;
  
  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  role: string;

  @IsString()
  @IsOptional()
  designation: string;

  @IsString()
  @IsOptional()
  password: string;

  @IsNumber()
  @IsOptional()
  phone: number;

  @IsString()
  @IsOptional()
  departmentId: string;
}
