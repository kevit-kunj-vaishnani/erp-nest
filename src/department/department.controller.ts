/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { DepartmentService } from './department.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { AuthGuard } from '../guard/auth.gaurd';
import { AdminGuard } from '../guard/admin.guard';
import { UpdateDepartDto } from './dto/update-department.dto';

@Controller('department')
export class DepartmentController {
  constructor(private departmentService: DepartmentService) {}

  @Post('/add')
  @UseGuards(AuthGuard)
  @UseGuards(AdminGuard)
  async addDepartment(@Body() department: CreateDepartmentDto) {
    const departmentD = await this.departmentService.createDepartment(department);

    return departmentD;
  }

  @Get()
  @UseGuards(AuthGuard)
  @UseGuards(AdminGuard)
  async findDepartments() {
    return await this.departmentService.findAllDepartment();
  }

  @Get('/:_id')
  @UseGuards(AuthGuard)
  @UseGuards(AdminGuard)
  async findDepartmentById(@Param("_id") _id: string) {
    return await this.departmentService.findOneDepartment(_id);
  }
  
  @Patch('/update/:_id')
  @UseGuards(AuthGuard)
  @UseGuards(AdminGuard)
  getDepartmentByIdAndUpdate(@Param('_id') _id: string, @Body() body: UpdateDepartDto) {
    return this.departmentService.findOneDepartmentAndUpdate(_id, body);
  }

  @Delete('/delete/:_id')
  @UseGuards(AuthGuard)
  @UseGuards(AdminGuard)
  getDepartmentByIdAndDelete(@Param('_id') _id: string) {
    return this.departmentService.findOneDepartmentByIdAndDelete(_id);
  }
}
