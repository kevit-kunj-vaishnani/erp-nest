/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { AttendanceController } from './attendance.controller';
import { AttendanceService } from './attendance.service';
import { Attendance, AttendanceSchema } from './schemas/attendance.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AttendanceDemo } from '../db/data.stubs';
import { NotFoundException } from '@nestjs/common';
import { AttendanceModule } from './attendance.module';
import { StudentModule } from '../student/student.module';

describe('AttendanceController', () => {
  let controller: AttendanceController;
  let service: AttendanceService;
  let attendance: Attendance;

  interface Session {
    _id: string;
    role: string; // Add the 'role' property to the Session interface
  }

  const sessionMock: Session = {
    _id: '65659cd4b90e902e9615b956',
    role: 'ADMIN',
  };

  const reqMock: { session: Session } = {
    session: sessionMock,
  };

  beforeAll(async () => {
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
      controllers: [AttendanceController],
    }).compile();

    controller = module.get<AttendanceController>(AttendanceController);
    service = module.get<AttendanceService>(AttendanceService);
    await service.deleteall();
    reqMock.session.role = 'admin';
    attendance = await service.createAttendance(AttendanceDemo);
  });


  

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });


  describe('create attendance test cases', () => {
    it('should create attendance', async () => {
      const attendance2 = {
        "studentId":"539999999999984",
        "date": new Date('11/02/2023'),
        "isPresent": true
      };
      const result = await controller.addAttendance(attendance2);
      expect(result).not.toBeNull();
    });
  });

  describe('find attendance test cases', () => {
    it('find attendance by id', async () => {
      const attendance2: AttendanceModule = await controller.findAttendanceById(attendance._id.toString());
      expect(attendance2).not.toBeNull();
    });

    it('find all attendances', async () => {
      const attendance2: Attendance[] = await controller.findAttendances();
      expect(attendance2.length).toBeGreaterThan(0);
    });

    it('not found error when finding STAFF with invalid id', async () => {
      await expect(
        controller.findAttendanceById('656598ae6e86e5636c48f8b3'),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('update attendance test cases', () => {
    it('should update attendance', async () => {
      const updatedattendance = await controller.getAttendanceByIdAndUpdate(attendance._id.toString(), {
        "studentId":"539999999999984",
        "date": new Date('11/02/2024'),
        "isPresent": true
      });

      expect(updatedattendance.position !== attendance.position);
    });

    it('should not update attendance with invalid id', async () => {
      await expect(
        controller.getAttendanceByIdAndUpdate('655ddb1ae49e16889429dc4b', {
          "studentId":"539999999999984",
          "date": new Date('11/02/2024'),
          "isPresent": true 
      })).rejects.toThrow(NotFoundException);
    });
  });

  describe('delete attendance test cases', () => {
    it('should delete attendance', async () => {
      const deleted = await controller.getAttendanceByIdAndDelete(attendance._id.toString());
      expect(deleted).not.toBeNull();
    });

    it('should not delete attendance returns not found exception with invalid id', async () => {
      await expect(
        controller.getAttendanceByIdAndDelete('655ddb1ae49e16889429dc4b'),
      ).rejects.toThrow(NotFoundException);
    });
  });

});
