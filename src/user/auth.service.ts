/* eslint-disable prettier/prettier */
import {
    BadRequestException,
    Injectable,
    NotFoundException,
  } from '@nestjs/common';
  import { scrypt as _scrypt } from 'crypto';
  import { promisify } from 'util';
  import { UserService } from './user.service';
  import { CreateUserDto } from './dto/create-user.dto';
  
  const scrypt = promisify(_scrypt);
  
  @Injectable()
  export class AuthService {
    
    constructor(private userService: UserService) {}

    async addUser(user: CreateUserDto) {
    
        const userData = await this.userService.findByEmail(user.email);

        if (userData.length) {
            throw new BadRequestException(' Email already in use');
        }

        const userCreate = await this.userService.createUser(user);

        return userCreate;
    }

    async login(email: string, password: string) {
        
        const [user] = await this.userService.findByEmail(email);
        
        if (!user) {
          throw new NotFoundException('Invalid Credentials');
        }
        
        const [salt, storedHash] = user.password.split('.');
        
        const hash = (await scrypt(password, salt, 32)) as Buffer;
        
        if (hash.toString('hex') !== storedHash) {
          throw new BadRequestException('Invalid Credentials');
        }
        
        return user;
      }
  }