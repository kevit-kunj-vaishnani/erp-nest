/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';


@Injectable()
export class UserService {
    
    constructor(
        @InjectModel('User')     //  This decorator is used to inject a MongoDB/Mongoose model into the UsersService class
        private userModel: mongoose.Model<User>
    ){}

    async createUser(createUserDto: CreateUserDto) {
        const user = await this.userModel.create(createUserDto);
        return user;
    }

    async findAllUser(){
        const user = await this.userModel.find();
        return user;
    }

    async findUser(id:string){  
        const user = await this.userModel.findById(id);

        if(!user){
            throw new NotFoundException('User not found');
        }
        
        return user;
    }

    async findByEmail(email: string) {
        const user = await this.userModel.find({email});
        return user;
    }

    async findOneUserAndUpdate(id:string, attrs: Partial<User>){
    
        const user = await this.userModel.findById(id);
   
        if (!user) {
        throw new NotFoundException('user not found in updateUserById in user.service.ts');
        }
        
        Object.assign(user, attrs);
        return user.save();
    }

    async findOneUserByIdAndDelete(id: string){

        const user = await this.userModel.findById(id);

        if (!user) {
            throw new NotFoundException('user not found in updateUserById in user.service.ts');
        }

        return this.userModel.findByIdAndDelete(id);
    }
}
