/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsOptional } from 'class-validator';

@Schema()
export class Department {
    
    @Prop({required: true})
    name: string;

    @Prop({required: true, unique: true})
    initials: string;

    @IsOptional()
    @Prop({default: 0})
    occupiedSeats: number;

    @Prop({required: true})
    availableSeats: number;

    @Prop({required: true})
    batch: number;
}

export const DepartmentSchema = SchemaFactory.createForClass(Department)
