/* eslint-disable prettier/prettier */
import { BadRequestException, Inject, Injectable, NotFoundException, forwardRef } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Student } from './schemas/student.schema';
import { CreateStudentDto } from './dto/create-student.dto';
import { AttendanceService } from '../attendance/attendance.service';
import { DepartmentService } from '../department/department.service';


@Injectable()
export class StudentService {
    
    constructor(
        @InjectModel('Student')     //  This decorator is used to inject a MongoDB/Mongoose model into the StudentsService class
        private studentModel: mongoose.Model<Student>,
        
        private attendanceService: AttendanceService,

        @Inject(forwardRef(() => DepartmentService))
        private departmentService: DepartmentService,
    ){}

    // create Student
    async createStudent(createStudentDto: CreateStudentDto) {
        const student = await this.studentModel.create(createStudentDto);
        return student;
    }

    // find All Students
    async findAllStudent(){
        const student = await this.studentModel.find();
        
        return student;
    }

    // find One Student
    async findStudent(id:string){  
        const student = await this.studentModel.findById(id);

        if(!student){
            throw new NotFoundException('Student not found');
        }
        
        return student;
    }

    // find Student by Email
    async findByEmail(email: string) {
        const student = await this.studentModel.find({email});
        return student;
    }

    // update One Student
    async findOneStudentAndUpdate(id:string, attrs: Partial<Student>){
    
        const student = await this.studentModel.findById(id);
   
        if (!student) {
        throw new NotFoundException('student not found in updateStudentById in student.service.ts');
        }
        
        Object.assign(student, attrs);
        return student.save();
    }

    // delete One Student
    async findOneStudentByIdAndDelete(id: string){

        const student = await this.studentModel.findById(id);

        if (!student) {
            throw new NotFoundException('student not found in updateStudentById in student.service.ts');
        }

        await this.attendanceService.deleteAllAttendance(id)
        return this.studentModel.findByIdAndDelete(id);
    }

    // check seat count
    async checkSeatCount(id: string){
        const department = await this.departmentService.findOneDepartment(id)

        if(department.occupiedSeats >= department.availableSeats)
        {
            throw new BadRequestException('seats not available')
        }
    }

    // increase seat count
    async increaseSeatCount(id: string) {
      const department = await this.departmentService.findOneDepartment(id)
      
      department.occupiedSeats++;
      
      await department.save();
    }

    // decrease seat count
    async decreaseSeatOccupied(id: string) {
        const department = await this.departmentService.findOneDepartment(id);

        if (department.occupiedSeats <= 0) {
            throw 'seats already 0';
          }
      
        department.occupiedSeats = department.occupiedSeats - 1;

        await department.save();   
    }

    // delete all student having below id
    async deleteAllStudent(id: string) {
        await this.studentModel.deleteMany({departmentId: id});
    }

    // delete all student
    async deleteall(){
        await this.studentModel.deleteMany();

    }
}
