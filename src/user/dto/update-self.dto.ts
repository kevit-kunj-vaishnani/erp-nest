/* eslint-disable prettier/prettier */
import { IsString } from 'class-validator';

export class UpdateSelfDto {

    @IsString()
    password: string;

}