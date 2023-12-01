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

        // const salt = randomBytes(8).toString('hex');    //hex = salt will be in num, alphabet    // this will only hash pass on add . as we ant on update also so for that in schema
        // const hash = (await scrypt (user.password, salt, 32)) as Buffer;
        // const finalPassword = salt + '.' + hash.toString('hex');
        // user.password = finalPassword;

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