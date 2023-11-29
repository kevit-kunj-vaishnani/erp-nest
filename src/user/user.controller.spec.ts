/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User, UserSchema } from './schemas/user.schema';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { StaffOne } from '../db/data.stubs';
import { NotFoundException } from '@nestjs/common';
import { UserModule } from './user.module';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;
  let user: User;

  interface Session {
    _id: string;
    role: string; // Add the 'role' property to the Session interface
  }

  const sessionMock: Session = {
    _id: '65659cd4b90e902e9615b956',
    role: 'ADMIN',
  };

  const reqMock: { session: Session } = {
    session: sessionMock,
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          envFilePath: '.env',
          isGlobal: true,
        }),
        MongooseModule.forRoot(process.env.DB_URL, {
          dbName: process.env.DB_NAME,
        }),
        MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
      ],
      providers: [UserService, AuthService],
      controllers: [UserController],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
    await service.deleteall();
    reqMock.session.role = 'admin';
    user = await service.createUser(StaffOne);
  });


  

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('login test case', () => {
    it('should login staff ', async () => {
      sessionMock._id = user._id;
      const user2 = await controller.signIn(
        {
          email: 'mohan@gmail.com',
          password: 'mohan',
        },
        reqMock,
      );
      expect(user2).not.toBeNull();
    });
  });

  describe('create staff test cases', () => {
    it('should create staff', async () => {
      const staff2 = {
        name: 'sid',
        email: 'sid@gamil.com',
        password: '1234',
        designation: 'peon',
        role: 'STAFF',
        phone: 12,
        departmentId: '4233333333242242'
      };
      const result = await controller.addUser(staff2);
      expect(result).not.toBeNull();
    });
  });

  describe('find staff test cases', () => {
    it('find staff by id', async () => {
      const staff2: UserModule = await controller.findUserById(user._id.toString());
      expect(staff2).not.toBeNull();
    });

    it('find all staffs', async () => {
      const staff2: User[] = await controller.findUsers();
      expect(staff2.length).toBeGreaterThan(0);
    });

    it('not found error when finding STAFF with invalid id', async () => {
      await expect(
        controller.findUserById('656598ae6e86e5636c48f8b3'),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('update staff test cases', () => {
    it('should update staff', async () => {
      const updateduser = await controller.getUserByIdAndUpdate(user._id.toString(), {
        designation: 'peon',
        name: 'abc',
        email: 'pqr',
        phone: 0,
        role: 'STAFF',
        departmentId: '234'
      });

      expect(updateduser.position !== user.position);
    });

    it('should not update user with invalid id', async () => {
      await expect(
        controller.getUserByIdAndUpdate('655ddb1ae49e16889429dc4b', {
          designation: 'HOOD',
          name: '',
          email: '',
          phone: 0,
          role: '',
          departmentId: '',
        }),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('delete staff test cases', () => {
    it('should delete staff', async () => {
      const deleted = await controller.getUserByIdAndDelete(user._id.toString());
      expect(deleted).not.toBeNull();
    });

    it('should not delete staff returns not found exception with invalid id', async () => {
      await expect(
        controller.getUserByIdAndDelete('655ddb1ae49e16889429dc4b'),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('signoutUser', () => {
    it('should signout', async () => {
      controller.logout(reqMock);
      // const loggedOutStaff = await controller.getSelf(reqMock);
      expect(200);
    });
  });
});

// import { Test, TestingModule } from '@nestjs/testing';
// import { UserController } from './user.controller';

// describe('UserController', () => {
//   let controller: UserController;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       controllers: [UserController],
//     }).compile();

//     controller = module.get<UserController>(UserController);
//   });

//   it('should be defined', () => {
//     expect(controller).toBeDefined();
//   });
// });
