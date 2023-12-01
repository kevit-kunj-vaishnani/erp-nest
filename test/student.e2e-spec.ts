/* eslint-disable prettier/prettier */
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { MongooseModule } from '@nestjs/mongoose';
import { TestingModule, Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import {
  Department,
  DepartmentSchema,
} from '../src/department/schemas/department.schema';
import { DepartmentService } from '../src/department/department.service';
import { User, UserSchema } from '../src/user/schemas/user.schema';
import { UserService } from '../src/user/user.service';
import { DepartmentOne, StaffOne, StudentOne } from '../src/db/data.stubs';
import { AttendanceSchema } from '../src/attendance/schemas/attendance.schema';
import { Student, StudentSchema } from '../src/student/schemas/student.schema';
import { AttendanceService } from '../src/attendance/attendance.service';
import { StudentService } from '../src/student/student.service';
// let cookie;
// let staffCookie;
describe('AppController (e2e)', () => {
  let app: INestApplication;
  let userService: UserService;
  let departmentService: DepartmentService;
  let studentService: StudentService;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let department: Department;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let user: User;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let admin: User;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let student: Student;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot('mongodb://localhost:27017', {
          dbName: 'NEST-COLLEGE-ERP-test',
        }),
        MongooseModule.forFeature([
          { name: 'User', schema: UserSchema },
          { name: 'Department', schema: DepartmentSchema },
          { name: 'Attendance', schema: AttendanceSchema },
          { name: 'Student', schema: StudentSchema },
        ]),
        AppModule,
      ],
      providers: [
        UserService,
        DepartmentService,
        AttendanceService,
        StudentService,
      ],
    }).compile();

    userService = moduleFixture.get<UserService>(UserService);
    departmentService = moduleFixture.get<DepartmentService>(DepartmentService);
    studentService = moduleFixture.get<StudentService>(StudentService);


    await userService.deleteall();
    await studentService.deleteall();
    await departmentService.deleteall();

    await userService.createUser(StaffOne);
    await studentService.createStudent(StudentOne);
    await departmentService.createDepartment(DepartmentOne);

    // adminOne = await userService.create(AdminOne);

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('Login Routes', () => {
  //   it('user should login', async () => {
  //     const user = await request(app.getHttpServer())
  //       .post('/user/login')
  //       .send({
  //         email: 'admin@gmail.com',
  //         password: 'admin',
  //       })
  //       .expect(200);

  //     cookie = user.header['set-cookie'];
  //     console.log(cookie);
  //   });

    // it('credential not correct during signup', async () => {
    //   const response = await request(app.getHttpServer())
    //     .post('/user/login')
    //     .send({
    //       email: abc@gmail.com,
    //       password: StaffOne.password,
    //     })
    //     .expect(200);
    //   staffCookie = response.header['set-cookie'];
    //   console.log(staffCookie);
    // });
  });

//   describe('create student', () => {
//     it('create student', async () => {
//       return request(app.getHttpServer())
//         .post('/student/add')
//         .send({
//           email: 'mohan@gmail.com',
//           name: 'mohan',
//           password: '1234',
//           role: 'student',
//           phone: 325467445,
//           departmentId: DepartmentOne._id,
//           sem: 7
//         })
//         .expect(201);
//     });
//   });

  describe('find Student', () => {
    // it('find student by id', async () => {
    //   return request(app.getHttpServer())
      
    //     .get(`/student/${StudentOne._id.toString()}`)
    //     .expect(200);
    // });

    // it('should not find user with wrong user ', async () => {
    //   return request(app.getHttpServer())
    //     .get(`/student/655ddf547a383cfa19626f03`)
    //     .expect(404);
    // });

    // it('find all student', async () => {
    //   return request(app.getHttpServer())
    //     .get('/student/')
    //     .expect(200);
    // });
  });

  describe('update student', () => {
    // it('update student', async () => {
    //   const { body } = await request(app.getHttpServer())
    //     .patch(`/student/update/${StudentOne._id.toString()}`)
    //     .send({
    //       name: 'pcv',
    //     })
    //     .expect(200);

    //   expect(body.name).toBe('pcv');
    // });

    // it('not update student id not correct', async () => {
    //   return request(app.getHttpServer())
    //     .patch(`/student/update/655ddf547a383cfa19626f03`)
    //     .send({
    //       sem: 5,
    //     })

    //     .expect(404);
    // });
  });

  describe('delete Student', () => {
    it('delete student', async () => {
      const { body } = await request(app.getHttpServer())
        .delete(`/student/delete/${StudentOne._id.toString()}`)
        .expect(200);

      expect(body._id.toString()).toBe(StudentOne._id.toString());
    });

    // it('not found user in delete', async () => {
    //   return request(app.getHttpServer())
    //     .delete(`/user/655ddf547a383cfa19626f03`)
    //     .expect(404);
    // });
  });
});
