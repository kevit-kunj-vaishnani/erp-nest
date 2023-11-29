/* eslint-disable prettier/prettier */
import {
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Department } from './schemas/department.schema';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { StudentService } from '../student/student.service';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectModel('Department') //  This decorator is used to inject a MongoDB/Mongoose model into the DepartmentsService class
    private departmentModel: mongoose.Model<Department>,
    
    @Inject(forwardRef(() => StudentService))
    private studentService: StudentService,
  ) {}

  async createDepartment(createDepartmentDto: CreateDepartmentDto) {
    const department = await this.departmentModel.create(createDepartmentDto);
    return department;
  }

  async findAllDepartment() {
    const department = await this.departmentModel.find();

    return department;
  }

  async findOneDepartment(id: string) {
    const department = await this.departmentModel.findById(id);

    if (!department) {
      throw new NotFoundException('Department not found');
    }

    return department;
  }

  async findOneDepartmentAndUpdate(id: string, attrs: Partial<Department>) {
    const department = await this.departmentModel.findById(id);

    if (!department) {
      throw new NotFoundException(
        'department not found in updateDepartmentById in department.service.ts',
      );
    }

    Object.assign(department, attrs);
    return department.save();
  }

  async findOneDepartmentByIdAndDelete(id: string) {
    const department = await this.departmentModel.findById(id);

    if (!department) {
      throw new NotFoundException(
        'department not found in updateDepartmentById in department.service.ts',
      );
    }

    await this.studentService.deleteAllStudent(id);
    return this.departmentModel.findByIdAndDelete(id);
  }

  async deleteall(){
    return this.departmentModel.deleteMany();
  }
}
