/* eslint-disable prettier/prettier */
import { INestApplication } from '@nestjs/common';
// import * as request from 'supertest';
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
import { DepartmentOne, StaffOne } from '../src/db/data.stubs';
import { AttendanceSchema } from '../src/attendance/schemas/attendance.schema';
import { StudentSchema } from '../src/student/schemas/student.schema';
import { AttendanceService } from '../src/attendance/attendance.service';
import { StudentService } from '../src/student/student.service';
// let cookie;
// let staffCookie;
describe('AppController (e2e)', () => {
  let app: INestApplication;
  let userService: UserService;
  let departmentService: DepartmentService;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let department: Department;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let userOne: User;

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

    await userService.deleteall();
    await departmentService.deleteall();
    await departmentService.createDepartment(DepartmentOne);
    userOne = await userService.createUser(StaffOne);

    // adminOne = await userService.create(AdminOne);

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('Login Routes test cases', () => {
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

  describe('create user', () => {
  //   it('create user', async () => {
  //     return request(app.getHttpServer())
  //       .post('/user/add')
  //       // .set('Cookie', cookie)
  //       .send({
  //         email: 'mohan@gmail.com',
  //         name: 'mohan',
  //         password: '1234',
  //         role: 'staff',
  //         designation: 'Teacher',
  //         phone: 325467445,
  //         departmentId: DepartmentOne._id,
  //       })
  //       .expect(201);
  //   });
  });

  describe('find User', () => {
  //   it('find user by id', async () => {
  //     return request(app.getHttpServer())
      
  //       .get(`/user/${StaffOne._id.toString()}`)
  //       .expect(200);
  //   });

  //   it('should not find user with wrong user ', async () => {
  //     return request(app.getHttpServer())
  //       .get(`/user/327894882349021`)
  //       .expect(404);
  //   });

  //   it('/staffs/get/ (GET) {should find all staffs}', async () => {
  //     return request(app.getHttpServer())
  //       .get('/user/')
  //       .set('Cookie', cookie)
  //       .expect(200);
  //   });
  });

  describe('update user', () => {
    // it('update user', async () => {
    //   const { body } = await request(app.getHttpServer())
    //     .patch(`/user/update/${StaffOne._id.toString()}`)
    //     .send({
    //       designation: 'abc',
    //     })
    //     .expect(200);

    //   expect(body.designation).toBe('abc');
    // });

    // it('not update user id not correct', async () => {
    //   return request(app.getHttpServer())
    //     .patch(`/user/update/655ddf547a383cfa19626f03`)
    //     .send({
    //       designation: 'abc',
    //     })

    //     .expect(404);
    // });
  });

  describe('delete User', () => {
    // it('delete staff', async () => {
    //   const { body } = await request(app.getHttpServer())
    //     .delete(`/user/delete/${StaffOne._id.toString()}`)
    //     .expect(200);

    //   expect(body._id.toString()).toBe(StaffOne._id.toString());
    // });

    // it('not found user in delete', async () => {
    //   return request(app.getHttpServer())
    //     .delete(`/user/655ddf547a383cfa19626f03`)
    //     .expect(404);
    // });
  });
});
