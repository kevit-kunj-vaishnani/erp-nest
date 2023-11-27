/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Attendance {
    
    @Prop({required: true})
    studentId: string;

    @Prop({required: true})
    date: Date;

    @Prop({required: true})
    isPresent: boolean
   
}

export const AttendanceSchema = SchemaFactory.createForClass(Attendance)
