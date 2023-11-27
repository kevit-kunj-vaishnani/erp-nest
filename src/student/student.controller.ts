/* eslint-disable prettier/prettier */
import { Body, Controller, Post, Get, Param, Patch, Delete, Session, UseGuards } from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateAllDto } from './dto/update-all-fields.dto'
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { UpdateStudentSelfDto } from './dto/update-self-password.dto';
import { AuthGuard } from 'src/guard/auth.gaurd';
import { StaffAdminGuard } from 'src/guard/staff-admin.guard';
import { StudentGuard } from 'src/guard/student.guard';

@Controller('student')
export class StudentController {

    constructor(private studentService: StudentService, private authService: AuthService){}

    @Post('/add')
    @UseGuards(AuthGuard)
    @UseGuards(StaffAdminGuard)
    async addStudent(@Body() student:CreateStudentDto) {
        
        const studentD = await this.authService.addStudent(student);
        
        return studentD;
    }

    @Get()
    @UseGuards(AuthGuard)
    @UseGuards(StaffAdminGuard)
    async findStudents() {
        return await this.studentService.findAllStudent();
    }
    
    @Patch('/update/myself')
    @UseGuards(AuthGuard)
    @UseGuards(StudentGuard)
    updateStudentSelf(@Body() body: UpdateStudentSelfDto, @Session() session: any) {
        console.log(session);
        
        return this.studentService.findOneStudentAndUpdate(session._id, body);
    }

    @Patch('/update/:_id')
    @UseGuards(AuthGuard)
    @UseGuards(StaffAdminGuard)
    getStudentByIdAndUpdate(@Param('_id') _id: string, @Body() body: UpdateAllDto){
        return this.studentService.findOneStudentAndUpdate(_id,body)
    }

    @Delete('/delete/:_id')
    @UseGuards(AuthGuard)
    @UseGuards(StaffAdminGuard)
    getStudentByIdAndDelete(@Param('_id') _id: string){
        return this.studentService.findOneStudentByIdAndDelete(_id)
    }

    @Post('/login')
    async signIn(@Body() body: LoginDto, @Session() session: any) {
      
      const student = await this.authService.login(body.email, body.password);
      
      session._id = student._id;
      session.role = student.role;
      
      return student;
    }

    @Get('/self')
    @UseGuards(AuthGuard)
    @UseGuards(StudentGuard)
    async me(@Session() session: any){
        return await this.studentService.findStudent(session._id);
    }

    @Post('/logout')
    @UseGuards(AuthGuard)
    async logout(@Session() session:any){

        const student = await this.studentService.findStudent(session._id);

        session._id = null;
        session.role = null;  

        return student;
    }

    @Get('/:_id')
    @UseGuards(AuthGuard)
    @UseGuards(StaffAdminGuard)
    async findStudentById(@Param('_id') _id:string) {
        return await this.studentService.findStudent(_id);
    }
}
