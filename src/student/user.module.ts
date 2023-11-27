/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { StudentSchema } from './schemas/student.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthService } from './auth.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Student', schema: StudentSchema }])],
  controllers: [StudentController],
  providers: [StudentService, AuthService],
})

export class StudentModule {}
