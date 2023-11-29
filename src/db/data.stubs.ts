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
  departmentId: '29872043293235235234',
  phone: 325467445,
};

const AdminOne: CreateUserDto & { _id: Types.ObjectId } = {
  _id: new Types.ObjectId(),
  email: 'admin@gmail.com',
  name: 'admin',
  password: '123',
  role: 'admin',
  designation: 'teacher',
  departmentId: '29872043293235235234',
  phone: 852,
};

const AttendanceDemo: CreateAttendanceDto & { _id: Types.ObjectId } = {
  _id: new Types.ObjectId(),
  studentId: StudentOne._id.toString(),
  isPresent: false,
  date: new Date('11/02/2023'),
};

const DepartmentOne = {
  _id: new Types.ObjectId(),
  name: 'CE',
  initials: 'CE2024',
  availableSeats: 5,
  occupiedSeats: 0,
  batch: 2024,
};

export {
  AttendanceDemo,
  StudentOne,
  StaffOne,
  AdminOne,
  DepartmentOne,
};