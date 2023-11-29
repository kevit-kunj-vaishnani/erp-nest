/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { StudentService } from './student.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { Student, StudentSchema } from './schemas/student.schema';
import { StudentOne } from '../db/data.stubs';
import { NotFoundException } from '@nestjs/common';
import { AttendanceModule } from '../attendance/attendance.module';
import { DepartmentModule } from '../department/department.module';

describe('StudentService', () => {
    let service: StudentService;
    let student: Student;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
        imports: [
            ConfigModule.forRoot({
                envFilePath: '.env',
                isGlobal: true,
            }),
            MongooseModule.forRoot(process.env.DB_URL, {
                dbName: process.env.DB_NAME,
            }),
            MongooseModule.forFeature([{ name: 'Student', schema: StudentSchema }]),
            AttendanceModule,
            DepartmentModule
        ],
        providers: [StudentService],
        }).compile();

        service = module.get<StudentService>(StudentService);
        await service.deleteall();
        student = await service.createStudent(StudentOne);
    });




    it('should be defined', () => {
        expect(service).toBeDefined();
    });
  
  
  
  
    describe('Find Student Test Cases', () => {        
        
        it('find student by id', async () => {
            const student2: Student = await service.findStudent(student._id.toString());
            expect(student2).not.toBeNull();
        });
        
        it('find all students', async () => {
            const student2: Student[] = await service.findAllStudent();
            expect(student2.length).toBeGreaterThan(0);
        });
        
        it('not found error when giving invalid student id', async () => {
            await expect(service.findStudent('6565bd0c75bba59d5e850693')).rejects.toThrow(
                NotFoundException,
            );
        });
    });


    describe('Update Student Test Cases', () => {
        it('should update student', async () => {
            const updatedStudent = await service.findOneStudentAndUpdate(student._id.toString(), {sem: 5});
                 
            expect(updatedStudent.designation !== student.designation);
        });
    
        it('should not update student with invalid id', async () => {
          await expect(
            service.findOneStudentAndUpdate('655ddb1ae49e16889429dc4b', { sem: 5 })).rejects.toThrow(NotFoundException);
        });
    });


    describe('Delete Staff Test Cases', () => {
        it('should delete staff', async () => {
            const deleted = await service.findOneStudentByIdAndDelete(student._id.toString());
            expect(deleted).not.toBeNull();
        });
    
        it('should not delete staff returns not found exception with invalid id', async () => {
            await expect(service.findOneStudentByIdAndDelete('655ddb1ae49e16889429dc4b')).rejects.toThrow(NotFoundException);
        });
    });
    
});