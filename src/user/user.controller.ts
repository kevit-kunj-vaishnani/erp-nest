/* eslint-disable prettier/prettier */
import { Body, Controller, Post, Get, Param, Patch, Delete, Session } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('user')
export class UserController {

    constructor(private userService: UserService, private authService: AuthService){}

    @Post('/add')
    async addUser(@Body() user:CreateUserDto, @Session() session:any) {

        const userD = await this.authService.addUser(user);
        
        session.userId = userD._id;   
        
        return userD;
    }

    @Get()
    async findUsers() {
        return await this.userService.findAllUser();
    }

    @Patch('/update/:_id')
    getUserByIdAndUpdate(@Param('_id') _id: string, @Body() body: UpdateUserDto){
        return this.userService.findOneUserAndUpdate(_id,body)
    }

    @Delete('/delete/:_id')
    getUserByIdAndDelete(@Param('_id') _id: string){
        return this.userService.findOneUserByIdAndDelete(_id)
    }

    @Post('/login')
    async signIn(@Body() body: LoginUserDto, @Session() session: any) {
      const user = await this.authService.login(body.email, body.password);
      
      session.userid = user._id;
      session.role = user.role;
    
      return session.userid;
    }

    @Get('/self')
    async me(@Session() session: any){
        return await this.userService.findUser(session.userid);
    }

    @Post('/logout')
    logout(@Session() session:any){

        session.userid = null;
        session.role = null;  

        return 'user logout'
    }

    @Get('/:_id')
    async findUserById(@Param('_id') _id:string) {
        return await this.userService.findUser(_id);
    }
}
