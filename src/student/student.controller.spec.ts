/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { Student, StudentSchema } from './schemas/student.schema';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { StudentOne } from '../db/data.stubs';
import { AttendanceModule } from '../attendance/attendance.module';
import { DepartmentModule } from '../department/department.module';
import { NotFoundException } from '@nestjs/common';
import { StudentModule } from './student.module';

describe('StudentController', () => {
  let controller: StudentController;
  let service: StudentService;
  let student: Student;

  interface Session {
    _id: string;
    role: string; // Add the 'role' property to the Session interface
  }

  const sessionMock: Session = {
    _id: '6565d747b90e902e9615b95e',
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
        MongooseModule.forFeature([{ name: 'Student', schema: StudentSchema }]),
        AttendanceModule,DepartmentModule],
      providers: [StudentService, AuthService],
      controllers: [StudentController],
    }).compile();

    controller = module.get<StudentController>(StudentController);
    service = module.get<StudentService>(StudentService);
    await service.deleteall();
    reqMock.session.role = 'STUDENT';
    student = await service.createStudent(StudentOne);
  });

  

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('login test case', () => {
    it('should login student ', async () => {
      sessionMock._id = student._id;
      const student2 = await controller.signIn(
        {
          email: 'yami@gmail.com',
          password: '123',
        },
        reqMock,
      );
      expect(student2).not.toBeNull();
    });
  });


  describe('create student test cases', () => {
    it('should create student', async () => {
      const student2 = {
        name: 'sid',
        email: 'sid@gamil.com',
        password: '1234',
        role: 'STUDENT',
        phone: 12,
        sem: 7,
        departmentId:'6565da8db90e902e9615b964'
      };
      const result = await controller.addStudent(student2);
      expect(result).not.toBeNull();
    });
  });


  describe('find student test cases', () => {
    it('find student by id', async () => {
      const student2: StudentModule = await controller.findStudentById(student._id.toString());
      expect(student2).not.toBeNull();
    });

    it('find all students', async () => {
      const student2: Student[] = await controller.findStudents();
      expect(student2.length).toBeGreaterThan(0);
    });

    it('not found error when finding STAFF with invalid id', async () => {
      await expect(
        controller.findStudentById('656598ae6e86e5636c48f8b3'),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('update student test cases', () => {
    it('should update student', async () => {
      const updatedstudent = await controller.getStudentByIdAndUpdate(student._id.toString(), {
        designation: 'peon',
        name: 'abc',
        email: 'pqr',
        phone: 324232,
        role: 'STUDENT',
        departmentId: '6566b861bcc16268fd03bc9e'
      });

      expect(updatedstudent.position !== student.position);
    });

    it('should not update student with invalid id', async () => {
      await expect(
        controller.getStudentByIdAndUpdate('655ddb1ae49e16889429dc4b', {
          designation: 'HOOD',
          name: '',
          email: '',
          phone: 0,
          role: '',
          departmentId: '',
        }),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('delete student test cases', () => {
    it('should delete student', async () => {
      const deleted = await controller.getStudentByIdAndDelete(student._id.toString());
      expect(deleted).not.toBeNull();
    });

    it('should not delete student returns not found exception with invalid id', async () => {
      await expect(
        controller.getStudentByIdAndDelete('655ddb1ae49e16889429dc4b'),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('signoutStudent', () => {
    it('should signout', async () => {
      controller.logout(reqMock);
      // const loggedOutStudent = await controller.getSelf(reqMock);
      expect(200);
    });
  });
});
