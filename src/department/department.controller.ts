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

  /**
   * POST:- Create Department
   */
  @Post('/add')
  @UseGuards(AuthGuard)
  @UseGuards(AdminGuard)
  async addDepartment(@Body() department: CreateDepartmentDto) {
    const departmentD = await this.departmentService.createDepartment(department);

    return departmentD;
  }

  /**
   * GET:- Find Departments
   */
  @Get()
  @UseGuards(AuthGuard)
  @UseGuards(AdminGuard)
  async findDepartments() {
    return await this.departmentService.findAllDepartment();
  }
  
  /**
   * UPDATE:- Update Department
   */
  @Patch('/update/:_id')
  @UseGuards(AuthGuard)
  @UseGuards(AdminGuard)
  getDepartmentByIdAndUpdate(@Param('_id') _id: string, @Body() body: UpdateDepartDto) {
    return this.departmentService.findOneDepartmentAndUpdate(_id, body);
  }

  /**
   * DELETE:- Delete Department
   */
  @Delete('/delete/:_id')
  @UseGuards(AuthGuard)
  @UseGuards(AdminGuard)
  getDepartmentByIdAndDelete(@Param('_id') _id: string) {
    return this.departmentService.findOneDepartmentByIdAndDelete(_id);
  }
  
  /**
   * POST:- QUERY 4
   */
  @Post('/4')
  @UseGuards(AuthGuard)
  @UseGuards(AdminGuard)
  query4(@Body() obj) {
    return this.departmentService.aggregation4(obj);
  }

  /**
   * POST:- QUERY 3
   */
  @Post('/3')
  @UseGuards(AuthGuard)
  @UseGuards(AdminGuard)
  query3(@Body() obj) {
    return this.departmentService.aggregation3(obj);
  }

  /**
   * POST:- QUERY 2
   */
  @Post('/2')
  @UseGuards(AuthGuard)
  @UseGuards(AdminGuard)
  query2(@Body() obj) {
    return this.departmentService.aggregation2(obj);
  }

  /**
   * GET:- QUERY 1
   */
  @Get('/1')
  @UseGuards(AuthGuard)
  @UseGuards(AdminGuard)
  query1() {
    return this.departmentService.aggregation1();
  }

  /**
   * GET:- Get Department By ID
   */
  @Get('/:_id')
  @UseGuards(AuthGuard)
  @UseGuards(AdminGuard)
  async findDepartmentById(@Param("_id") _id: string) {
    return await this.departmentService.findOneDepartment(_id);
  }
}
