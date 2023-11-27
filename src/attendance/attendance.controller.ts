/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { AuthGuard } from 'src/guard/auth.gaurd';
import { AdminGuard } from 'src/guard/admin.guard';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';

@Controller('attendance')
export class AttendanceController {
  constructor(private attendanceService: AttendanceService) {}
  
  @Post('/add')
  @UseGuards(AuthGuard)
  @UseGuards(AdminGuard)
  async addAttendance(@Body() attendance: CreateAttendanceDto) {
    const attendanceD = await this.attendanceService.createAttendance(attendance);

    return attendanceD;
  }

  @Get()
  @UseGuards(AuthGuard)
  @UseGuards(AdminGuard)
  async findAttendances() {
    return await this.attendanceService.findAllAttendance();
  }

  @Get('/:_id')
  @UseGuards(AuthGuard)
  @UseGuards(AdminGuard)
  async findAttendanceById(@Param("_id") _id: string) {
    return await this.attendanceService.findOneAttendance(_id);
  }

  @Patch('/update/:_id')
  @UseGuards(AuthGuard)
  @UseGuards(AdminGuard)
  getAttendanceByIdAndUpdate(@Param('_id') _id: string, @Body() body: UpdateAttendanceDto) {
    return this.attendanceService.findOneAttendanceAndUpdate(_id, body);
  }

  @Delete('/delete/:_id')
  @UseGuards(AuthGuard)
  @UseGuards(AdminGuard)
  getAttendanceByIdAndDelete(@Param('_id') _id: string) {
    return this.attendanceService.findOneAttendanceByIdAndDelete(_id);
  }
}
