/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import mongoose from 'mongoose';
import { Attendance } from './schemas/attendance.schema';
import { InjectModel } from '@nestjs/mongoose';
import { CreateAttendanceDto } from './dto/create-attendance.dto';

@Injectable()
export class AttendanceService {
    
  constructor(
      @InjectModel('Attendance') //  This decorator is used to inject a MongoDB/Mongoose model into the AttendancesService class
      private attendanceModel: mongoose.Model<Attendance>,
  ) {}

  // create Attendance
  async createAttendance(createAttendanceDto: CreateAttendanceDto) {
    const attendance = await this.attendanceModel.create(createAttendanceDto);
    return attendance;
  }
  
  // find All Attendance
  async findAllAttendance() {
    const attendance = await this.attendanceModel.find();

    return attendance;
  }

  // find One Attendance
  async findOneAttendance(id: string) {
    const attendance = await this.attendanceModel.findById(id);

    if (!attendance) {
      throw new NotFoundException('Attendance not found');
    }

    return attendance;
  }

  // update One Attendance
  async findOneAttendanceAndUpdate(id: string, attrs: Partial<Attendance>) {
    const attendance = await this.attendanceModel.findById(id);

    if (!attendance) {
      throw new NotFoundException(
        'attendance not found in updateAttendanceById in attendance.service.ts',
      );
    }

    Object.assign(attendance, attrs);
    return attendance.save();
  }

  // delete One Attendance
  async findOneAttendanceByIdAndDelete(id: string) {
    const attendance = await this.attendanceModel.findById(id);

    if (!attendance) {
      throw new NotFoundException(
        'attendance not found in updateAttendanceById in attendance.service.ts',
      );
    }

    return this.attendanceModel.findByIdAndDelete(id);
  }

  // delete All Attendance who is having below student ID 
  async deleteAllAttendance(id: string) {
    return this.attendanceModel.deleteMany({studentId:id});
  }

  // delete All Attendance
  async deleteall(){
    return this.attendanceModel.deleteMany();
  }
}
