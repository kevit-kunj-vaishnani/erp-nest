/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';  // for db connection
import { ConfigModule } from '@nestjs/config';      // for db connection
import { UserModule } from './user/user.module';
import { StudentModule } from './student/student.module';
import { DepartmentModule } from './department/department.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DB_URL),
    UserModule,
    StudentModule,
    DepartmentModule,
  ],
  controllers: [],
  providers: [],
})

export class AppModule {}
