/* eslint-disable prettier/prettier */
import { Module, forwardRef } from '@nestjs/common';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { StudentSchema } from './schemas/student.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthService } from './auth.service';
import { AttendanceModule } from 'src/attendance/attendance.module'; 
import { DepartmentModule } from 'src/department/department.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Student', schema: StudentSchema }]), 
  AttendanceModule, 
  forwardRef(() => DepartmentModule) 
],
  controllers: [StudentController],
  providers: [StudentService, AuthService],
  exports: [StudentService]
})

export class StudentModule {}
