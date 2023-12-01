// /* eslint-disable prettier/prettier */
// import { Test, TestingModule } from '@nestjs/testing';
// import { INestApplication } from '@nestjs/common';
// import * as request from 'supertest';
// import { AppModule } from '../src/app.module';
// import { MongooseModule } from '@nestjs/mongoose';
// import { User, UserSchema } from '../src/user/schemas/user.schema';
// import {
//   Department,
//   DepartmentSchema,
// } from '../src/department/schemas/department.schema';
// import { StudentSchema } from '../src/student/schemas/student.schema';
// import { AttendanceSchema } from '../src/attendance/schemas/attendance.schema';
// import { UserService } from '../src/user/user.service';
// import { DepartmentService } from '../src/department/department.service';
// import { StudentService } from '../src/student/student.service';
// import { AttendanceService } from '../src/attendance/attendance.service';
// import { DepartmentOne, StaffOne } from '../src/db/data.stubs';

// describe('AppController (e2e)', () => {
//   let app: INestApplication;
//   let userService: UserService;
//   let departmentService: DepartmentService;

//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   let department: Department;
//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   let userOne: User;
//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   let adminOne: User;

//   beforeEach(async () => {
//     const moduleFixture: TestingModule = await Test.createTestingModule({
//       imports: [
//         MongooseModule.forRoot('mongodb://localhost:27017', {
//           dbName: 'NEST-COLLEGE-ERP-test1',
//         }),
//         MongooseModule.forFeature([
//           { name: 'User', schema: UserSchema },
//           { name: 'Department', schema: DepartmentSchema },
//           { name: 'Student', schema: StudentSchema },
//           { name: 'Attendance', schema: AttendanceSchema },
//         ]),
//         AppModule,
//       ],
//       providers: [
//         UserService,
//         DepartmentService,
//         StudentService,
//         AttendanceService,
//       ],
//     }).compile();

//     userService = moduleFixture.get<UserService>(UserService);
//     departmentService = moduleFixture.get<DepartmentService>(DepartmentService);

//     await userService.deleteall();
//     await departmentService.deleteall();

//     department = await departmentService.createDepartment(DepartmentOne);

//     userOne = await userService.createUser(StaffOne);

//     // adminOne = await userService.create(AdminOne);

//     app = moduleFixture.createNestApplication();
//     await app.init();
//   });

//   it('/ (GET)', () => {
//     return request(app.getHttpServer())
//       .get('/department')
//       .expect(200)
//       .expect('Hello World!');
//   });
// });
