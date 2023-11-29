/* eslint-disable prettier/prettier */
import { User, UserSchema } from './schemas/user.schema';
import { UserService } from './user.service';
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { StaffOne } from '../db/data.stubs';
import { NotFoundException } from '@nestjs/common';

describe('StaffService', () => {
    let service: UserService;
    let user: User;

    beforeEach(async () => {
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
          providers: [UserService],
      }).compile();

      service = module.get<UserService>(UserService);
      await service.deleteall();
      user = await service.createUser(StaffOne);
    });

    

    it('should be defined ', () => {
        expect(service).toBeDefined();
    });

    describe('find staff test cases', () => {
        it('find staff by id', async () => {
            const staff2: User = await service.findUser(user._id.toString());
            expect(staff2).not.toBeNull();
        });

        it('find all staffs', async () => {
          const staff2: User[] = await service.findAllUser();
          expect(staff2.length).toBeGreaterThan(0);
        });

        it('not found error when giving invalid staff id', async () => {
          await expect(
            service.findUser('655ddb1ae49e16889429dc4b'),
          ).rejects.toThrow(NotFoundException);
        });
    });

    describe('update staff test cases', () => {
        it('should update staff', async () => {
            const updatedStaff = await service.findOneUserAndUpdate(user._id.toString(), {designation: 'TA'});

            expect(updatedStaff.designation !== user.designation);
        });

        it('should not update staff with invalid id', async () => {
            await expect(service.findOneUserAndUpdate('655ddb1ae49e16889429dc4b', { designation: 'TA' })).rejects.toThrow(NotFoundException);
        });
    });

    describe('delete staff test cases', () => {
        it('should delete staff', async () => {
            const deleted = await service.findOneUserByIdAndDelete(user._id.toString());
            expect(deleted).not.toBeNull();
        });

        it('should not delete staff returns not found exception with invalid id', async () => {
            await expect(service.findOneUserByIdAndDelete('655ddb1ae49e16889429dc4b')).rejects.toThrow(NotFoundException);
        });
    });

});
