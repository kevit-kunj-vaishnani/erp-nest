/* eslint-disable prettier/prettier */
import { IsString } from 'class-validator';

export class CreateUserDto {

    @IsString()
    password: string;

}