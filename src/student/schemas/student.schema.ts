/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { NextFunction } from 'express';
import { promisify } from 'util';
import { Roles } from '../../role';

@Schema()
export class Student {
  [x: string]: any;
    
    @Prop({required: true})
    name: string;

    @Prop({required: true, unique: true})
    email: string;

    @Prop({required: true})
    password: string;

    @Prop({required: true})
    phone: number;

    @Prop({required: true})
    sem: number;

    @Prop({required: true})
    departmentId: string;

    @Prop({default: Roles.STUDENT, required: true})
    role: string;
}

export const StudentSchema = SchemaFactory.createForClass(Student)

StudentSchema.pre('save', async function (next: NextFunction) {
    
    const scrypt = promisify(_scrypt);
    
    if (this.isModified('password')) {
        
        const salt = randomBytes(8).toString('hex');
        const hash = (await scrypt(this.password, salt, 32)) as Buffer;
        const result = salt + '.' + hash.toString('hex');

        this.password = result;
    }
    next();
  });