/* eslint-disable prettier/prettier */
import { Body, Controller, Post, Get, Param, Patch, Delete, Session, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateSelfDto } from './dto/update-self.dto';
import { AdminGuard } from 'src/guard/admin.guard';
import { AuthGuard } from 'src/guard/auth.gaurd';
import { StaffAdminGuard } from 'src/guard/staff-admin.guard';

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
    
    @UseGuards(AuthGuard)
    @UseGuards(StaffAdminGuard)
    @Patch('/update/me')
    updateSelf(@Body() body: UpdateSelfDto, @Session() session: any) {
        return this.userService.findOneUserAndUpdate(session.userid, body);
    }

    @UseGuards(AuthGuard)
    @UseGuards(AdminGuard)
    @Patch('/update/:_id')
    getUserByIdAndUpdate(@Param('_id') _id: string, @Body() body: UpdateUserDto){
        return this.userService.findOneUserAndUpdate(_id,body)
    }

    @UseGuards(AuthGuard)
    @UseGuards(AdminGuard)
    @Delete('/delete/:_id')
    getUserByIdAndDelete(@Param('_id') _id: string){
        return this.userService.findOneUserByIdAndDelete(_id)
    }

    @Post('/login')
    async signIn(@Body() body: LoginUserDto, @Session() session: any) {
      
      const user = await this.authService.login(body.email, body.password);

      session.userid = user._id;
      session.role = user.role;
      
      return user;
    }

    @UseGuards(AuthGuard)
    @UseGuards(StaffAdminGuard)
    @Get('/self')
    async me(@Session() session: any){
        return await this.userService.findUser(session.userid);
    }

    @UseGuards(AuthGuard)
    @UseGuards(StaffAdminGuard)
    @Post('/logout')
    async logout(@Session() session:any){

        const user = await this.userService.findUser(session.userid);

        session.userid = null;
        session.role = null;  

        return user;
    }

    @Get('/:_id')
    async findUserById(@Param('_id') _id:string) {
        return await this.userService.findUser(_id);
    }
}
