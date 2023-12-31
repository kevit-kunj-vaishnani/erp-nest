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

    // create User
    async createUser(createUserDto: CreateUserDto) {
        const user = await this.userModel.create(createUserDto);
        return user;
    }

    // find All User
    async findAllUser(){
        const user = await this.userModel.find();
        
        return user;
    }

    // find One User
    async findUser(id:string){  
        const user = await this.userModel.findById(id);

        if(!user){
            throw new NotFoundException('User not found');
        }
        
        return user;
    }

    // find User by Email
    async findByEmail(email: string) {
        const user = await this.userModel.find({email});
        return user;
    }

    // update User
    async findOneUserAndUpdate(id:string, attrs: Partial<User>){
    
        const user = await this.userModel.findById(id);
   
        if (!user) {
        throw new NotFoundException('user not found in updateUserById in user.service.ts');
        }
        
        Object.assign(user, attrs);
        return user.save();
    }

    // delete User
    async findOneUserByIdAndDelete(id: string){

        const user = await this.userModel.findById(id);

        if (!user) {
            throw new NotFoundException('user not found in updateUserById in user.service.ts');
        }

        return this.userModel.findByIdAndDelete(id);
    }

    // delete Users
    async deleteall(){
        return await this.userModel.deleteMany({ role: {$ne: 'admin'}})
    }
}
