/* eslint-disable prettier/prettier */
import { Module, forwardRef } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { DepartmentController } from './department.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { DepartmentSchema } from './schemas/department.schema';
import { StudentModule } from 'src/student/student.module';


@Module({
  imports: [MongooseModule.forFeature([{ name: 'Department', schema: DepartmentSchema }]), 
  forwardRef(() => StudentModule)
],
  providers: [DepartmentService],
  controllers: [DepartmentController],
  exports: [DepartmentService],
})
export class DepartmentModule {}
