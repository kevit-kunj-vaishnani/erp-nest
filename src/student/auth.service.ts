/* eslint-disable prettier/prettier */
import {
    BadRequestException,
    Injectable,
    NotFoundException,
  } from '@nestjs/common';
  import { scrypt as _scrypt } from 'crypto';
  import { promisify } from 'util';
  import { StudentService } from './student.service';
  import { CreateStudentDto } from './dto/create-student.dto';
  
  const scrypt = promisify(_scrypt);
  
  @Injectable()
  export class AuthService {
    
    constructor(private studentService: StudentService) {}

    async addStudent(student: CreateStudentDto) {
    
        const studentData = await this.studentService.findByEmail(student.email);

        if (studentData.length) {
            throw new BadRequestException(' Email already in use');
        }

        // const salt = randomBytes(8).toString('hex');    //hex = salt will be in num, alphabet    // this will only hash pass on add . as we ant on update also so for that in schema
        // const hash = (await scrypt (student.password, salt, 32)) as Buffer;
        // const finalPassword = salt + '.' + hash.toString('hex');
        // student.password = finalPassword;

        const studentCreate = await this.studentService.createStudent(student);

        return studentCreate;
    }

    async login(email: string, password: string) {
        
      const [student] = await this.studentService.findByEmail(email);
        
        if (!student) {
          throw new NotFoundException('Invalid Credentials');
        }

        const [salt, storedHash] = student.password.split('.');
        
        const hash = (await scrypt(password, salt, 32)) as Buffer;
        
        if (hash.toString('hex') !== storedHash) {
          throw new BadRequestException('Invalid Credentials');
        }
        
        return student;
      }
  }