/* eslint-disable prettier/prettier */
import { Body, Controller, Post, Get, Param, Patch, Delete, Session, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateAllDto } from './dto/update-all-fields.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { UpdateSelfDto } from './dto/update-self-password.dto';
import { AdminGuard } from '../guard/admin.guard';
import { AuthGuard } from '../guard/auth.gaurd';
import { StaffAdminGuard } from '../guard/staff-admin.guard';

@Controller('user')
export class UserController {

    constructor(private userService: UserService, private authService: AuthService){}

    @Post('/add')
    @UseGuards(AuthGuard)
    @UseGuards(AdminGuard)
    async addUser(@Body() user:CreateUserDto) {

        const userD = await this.authService.addUser(user);
        
        return userD;
    }

    @Get()
    @UseGuards(AuthGuard)
    @UseGuards(AdminGuard)
    async findUsers() {
        return await this.userService.findAllUser();
    }
    
    @Patch('/update/me')
    @UseGuards(AuthGuard)
    @UseGuards(StaffAdminGuard)
    updateSelf(@Body() body: UpdateSelfDto, @Session() session: any) {
        return this.userService.findOneUserAndUpdate(session._id, body);
    }
    
    @Patch('/update/:_id')
    @UseGuards(AuthGuard)
    @UseGuards(AdminGuard)
    getUserByIdAndUpdate(@Param('_id') _id: string, @Body() body: UpdateAllDto){
        return this.userService.findOneUserAndUpdate(_id,body)
    }

    @Delete('/delete/:_id')
    @UseGuards(AuthGuard)
    @UseGuards(AdminGuard)
    getUserByIdAndDelete(@Param('_id') _id: string){
        return this.userService.findOneUserByIdAndDelete(_id)
    }

    @Post('/login')
    async signIn(@Body() body: LoginDto, @Session() session: any) {
      
      const user = await this.authService.login(body.email, body.password);

      session._id = user._id;
      session.role = user.role;
      
      return user;
    }

    @Get('/self')
    @UseGuards(AuthGuard)
    @UseGuards(StaffAdminGuard)
    async me(@Session() session: any){
        return await this.userService.findUser(session._id);
    }

    @Post('/logout')
    @UseGuards(AuthGuard)
    async logout(@Session() session:any){

        const user = await this.userService.findUser(session._id);

        session._id = null;
        session.role = null;  

        return user;
    }

    @Get('/:_id')
    @UseGuards(AuthGuard)
    @UseGuards(StaffAdminGuard)
    async findUserById(@Param('_id') _id:string) {
        return await this.userService.findUser(_id);
    }
}
