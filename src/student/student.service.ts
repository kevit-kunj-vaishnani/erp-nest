/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Student } from './schemas/student.schema';
import { CreateStudentDto } from './dto/create-student.dto';


@Injectable()
export class StudentService {
    
    constructor(
        @InjectModel('Student')     //  This decorator is used to inject a MongoDB/Mongoose model into the StudentsService class
        private studentModel: mongoose.Model<Student>
    ){}

    async createStudent(createStudentDto: CreateStudentDto) {
        const student = await this.studentModel.create(createStudentDto);
        return student;
    }

    async findAllStudent(){
        const student = await this.studentModel.find();
        
        return student;
    }

    async findStudent(id:string){  
        const student = await this.studentModel.findById(id);

        if(!student){
            throw new NotFoundException('Student not found');
        }
        
        return student;
    }

    async findByEmail(email: string) {
        const student = await this.studentModel.find({email});
        return student;
    }

    async findOneStudentAndUpdate(id:string, attrs: Partial<Student>){
    
        const student = await this.studentModel.findById(id);
   
        if (!student) {
        throw new NotFoundException('student not found in updateStudentById in student.service.ts');
        }
        
        Object.assign(student, attrs);
        return student.save();
    }

    async findOneStudentByIdAndDelete(id: string){

        const student = await this.studentModel.findById(id);

        if (!student) {
            throw new NotFoundException('student not found in updateStudentById in student.service.ts');
        }

        return this.studentModel.findByIdAndDelete(id);
    }
}
