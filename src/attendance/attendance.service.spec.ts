/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { AttendanceService } from './attendance.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { Attendance, AttendanceSchema } from './schemas/attendance.schema';
import { AttendanceDemo } from '../db/data.stubs';
import { NotFoundException } from '@nestjs/common';
import { StudentModule } from '../student/student.module';

describe('AttendanceService', () => {
    let service: AttendanceService;
    let attendance: Attendance;

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
            MongooseModule.forFeature([{ name: 'Attendance', schema: AttendanceSchema }]),
            StudentModule
        ],
        providers: [AttendanceService],
        }).compile();

        service = module.get<AttendanceService>(AttendanceService);
        await service.deleteall();
        attendance = await service.createAttendance(AttendanceDemo);
    });




    it('should be defined', () => {
        expect(service).toBeDefined();
    });
  
  
  
  
    describe('Find Attendance Test Cases', () => {        
        
        it('find attendance by id', async () => {
            const attendance2: Attendance = await service.findOneAttendance(attendance._id.toString());
            expect(attendance2).not.toBeNull();
        });
        
        it('find all attendances', async () => {
            const attendance2: Attendance[] = await service.findAllAttendance();
            expect(attendance2.length).toBeGreaterThan(0);
        });
        
        it('not found error when giving invalid attendance id', async () => {
            await expect(service.findOneAttendance('6565bd0c75bba59d5e850693')).rejects.toThrow(
                NotFoundException,
            );
        });
    });


    describe('Update Attendance Test Cases', () => {
        it('should update attendance', async () => {
            const updatedAttendance = await service.findOneAttendanceAndUpdate(attendance._id.toString(), {availableSeats: 5});
                 
            expect(updatedAttendance.availableSeats !== attendance.availableSeats);
        });
    
        it('should not update attendance with invalid id', async () => {
          await expect(
            service.findOneAttendanceAndUpdate('655ddb1ae49e16889429dc4b', { sem: 5 })).rejects.toThrow(NotFoundException);
        });
    });


    describe('Delete Attendance Test Cases', () => {
        it('should delete Attendance', async () => {
            const deleted = await service.findOneAttendanceByIdAndDelete(attendance._id.toString());
            expect(deleted).not.toBeNull();
        });
    
        it('should not delete Attendance returns not found exception with invalid id', async () => {
            await expect(service.findOneAttendanceByIdAndDelete('655ddb1ae49e16889429dc4b')).rejects.toThrow(NotFoundException);
        });
    });
    
});