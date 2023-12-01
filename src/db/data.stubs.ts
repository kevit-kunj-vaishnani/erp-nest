/* eslint-disable prettier/prettier */
import { CreateStudentDto } from '../student/dto/create-student.dto';
import { Types } from 'mongoose';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { CreateAttendanceDto } from '../attendance/dto/create-attendance.dto';

const StudentOne: CreateStudentDto & { _id: Types.ObjectId } = {
  _id: new Types.ObjectId(),
  name: 'Aman',
  phone: 8521479635,
  departmentId: '29872043293235235234',
  sem: 7,
  role: 'STUDENT',
  email: 'aman@gmail.com',
  password: 'aman',
};

const StaffOne: CreateUserDto & { _id: Types.ObjectId } = {
  _id: new Types.ObjectId(),
  email: 'mohan@gmail.com',
  name: 'mohan',
  password: '1234',
  role: 'STAFF',
  designation: 'Teacher',
  departmentId: '2342232422323232323',
  phone: 325467445,
};

const AdminOne: CreateUserDto & { _id: Types.ObjectId } = {
  _id: new Types.ObjectId(),
  email: 'admin@gmail.com',
  name: 'admin',
  password: 'admin',
  role: 'admin',
  designation: 'teacher',
  departmentId: '435093345',
  phone: 92309832,
};

const AttendanceDemo: CreateAttendanceDto & { _id: Types.ObjectId } = {
  _id: new Types.ObjectId(),
  studentId: StudentOne._id.toString(),
  isPresent: false,
  date: new Date('20/10/2024'),
};

const DepartmentOne = {
  _id: new Types.ObjectId(),
  name: 'CE',
  initials: 'CE2024',
  occupiedSeats: 0,
  availableSeats: 10,
  batch: 2024,
};

export {
  AttendanceDemo,
  StudentOne,
  StaffOne,
  AdminOne,
  DepartmentOne,
};