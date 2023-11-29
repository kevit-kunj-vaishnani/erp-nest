/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { DepartmentService } from './department.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { Department, DepartmentSchema } from './schemas/department.schema';
import { DepartmentOne } from '../db/data.stubs';
import { NotFoundException } from '@nestjs/common';
import { StudentModule } from '../student/student.module';

describe('DepartmentService', () => {
    let service: DepartmentService;
    let department: Department;

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
            MongooseModule.forFeature([{ name: 'Department', schema: DepartmentSchema }]),
            StudentModule
        ],
        providers: [DepartmentService],
        }).compile();

        service = module.get<DepartmentService>(DepartmentService);
        await service.deleteall();
        department = await service.createDepartment(DepartmentOne);
    });




    it('should be defined', () => {
        expect(service).toBeDefined();
    });
  
  
  
  
    describe('Find Department Test Cases', () => {        
        
        it('find department by id', async () => {
            const department2: Department = await service.findOneDepartment(department._id.toString());
            expect(department2).not.toBeNull();
        });
        
        it('find all departments', async () => {
            const department2: Department[] = await service.findAllDepartment();
            expect(department2.length).toBeGreaterThan(0);
        });
        
        it('not found error when giving invalid department id', async () => {
            await expect(service.findOneDepartment('6565bd0c75bba59d5e850693')).rejects.toThrow(
                NotFoundException,
            );
        });
    });


    describe('Update Department Test Cases', () => {
        it('should update department', async () => {
            const updatedDepartment = await service.findOneDepartmentAndUpdate(department._id.toString(), {availableSeats: 5});
                 
            expect(updatedDepartment.availableSeats !== department.availableSeats);
        });
    
        it('should not update department with invalid id', async () => {
          await expect(
            service.findOneDepartmentAndUpdate('655ddb1ae49e16889429dc4b', { sem: 5 })).rejects.toThrow(NotFoundException);
        });
    });


    describe('Delete Staff Test Cases', () => {
        it('should delete staff', async () => {
            const deleted = await service.findOneDepartmentByIdAndDelete(department._id.toString());
            expect(deleted).not.toBeNull();
        });
    
        it('should not delete staff returns not found exception with invalid id', async () => {
            await expect(service.findOneDepartmentByIdAndDelete('655ddb1ae49e16889429dc4b')).rejects.toThrow(NotFoundException);
        });
    });
    
});