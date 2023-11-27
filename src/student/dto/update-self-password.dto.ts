/* eslint-disable prettier/prettier */
import { IsString } from 'class-validator';

export class UpdateStudentSelfDto {

    @IsString()
    password: string;

}