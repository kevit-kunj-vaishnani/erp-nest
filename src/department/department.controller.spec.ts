/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { DepartmentController } from './department.controller';
import { DepartmentService } from './department.service';
import { Department, DepartmentSchema } from './schemas/department.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { DepartmentOne } from '../db/data.stubs';
import { NotFoundException } from '@nestjs/common';
import { DepartmentModule } from './department.module';
import { StudentModule } from '../student/student.module';

describe('DepartmentController', () => {
  let controller: DepartmentController;
  let service: DepartmentService;
  let department: Department;

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
        MongooseModule.forFeature([{ name: 'Department', schema: DepartmentSchema }]),
        StudentModule
      ],
      providers: [DepartmentService],
      controllers: [DepartmentController],
    }).compile();

    controller = module.get<DepartmentController>(DepartmentController);
    service = module.get<DepartmentService>(DepartmentService);
    await service.deleteall();
    reqMock.session.role = 'admin';
    department = await service.createDepartment(DepartmentOne);
  });


  

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });


  describe('create department test cases', () => {
    it('should create department', async () => {
      const department2 = {
        "name": "BE",
        "initials": "BE2024",
        "occupiedSeats": 0,
        "availableSeats": 1,
        "batch": 2024
      };
      const result = await controller.addDepartment(department2);
      expect(result).not.toBeNull();
    });
  });

  describe('find department test cases', () => {
    it('find department by id', async () => {
      const department2: DepartmentModule = await controller.findDepartmentById(department._id.toString());
      expect(department2).not.toBeNull();
    });

    it('find all departments', async () => {
      const department2: Department[] = await controller.findDepartments();
      expect(department2.length).toBeGreaterThan(0);
    });

    it('not found error when finding STAFF with invalid id', async () => {
      await expect(
        controller.findDepartmentById('656598ae6e86e5636c48f8b3'),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('update department test cases', () => {
    it('should update department', async () => {
      const updateddepartment = await controller.getDepartmentByIdAndUpdate(department._id.toString(), {
        name: 'Bachelor Of Engineering',
        initials: 'BE21',
        availableSeats: 10,
        occupiedSeats: 0,
        batch: 2024,
      });

      expect(updateddepartment.position !== department.position);
    });

    it('should not update department with invalid id', async () => {
      await expect(
        controller.getDepartmentByIdAndUpdate('655ddb1ae49e16889429dc4b', {
        name: 'Bachelor Of Engineering',
        initials: 'BE21',
        availableSeats: 10,
        occupiedSeats: 0,
        batch: 2024, 
      })).rejects.toThrow(NotFoundException);
    });
  });

  describe('delete department test cases', () => {
    it('should delete department', async () => {
      const deleted = await controller.getDepartmentByIdAndDelete(department._id.toString());
      expect(deleted).not.toBeNull();
    });

    it('should not delete department returns not found exception with invalid id', async () => {
      await expect(
        controller.getDepartmentByIdAndDelete('655ddb1ae49e16889429dc4b'),
      ).rejects.toThrow(NotFoundException);
    });
  });

});
