import { Test, TestingModule } from '@nestjs/testing';
import { userProviders } from './user.provide';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { Sequelize } from 'sequelize-typescript';
import { User } from './users.model';
import { BadRequestException, NotFoundException } from '@nestjs/common';
const sequelize = new Sequelize({
  dialect: 'mysql',
  host: 'localhost',
  username: 'root',
  password: null,
  database: 'auth',
});

sequelize.addModels([User]);

describe('UserController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService, ...userProviders],
    }).compile();
    controller = module.get<UsersController>(UsersController);
  });

  it('signup with valid data', async () => {
    const result: any = await controller.signup({
      username: 'salehs12asssasddasassd',
      password: '123456789',
      phone: '123456789789',
      email: 'saleh@saleh.com',
    });
    expect(result.username).toBe('salehs12asssasddasassd');
    expect(result.phone).toBe('123456789789');
  });

  it('signup with repeated data', async () => {
    jest
      .spyOn(controller, 'signup')
      .mockRejectedValue(
        new BadRequestException('Email is used try another one'),
      );
    await expect(
      controller.signup({
        username: 'salehs12asssasddasassd',
        password: '123456789',
        phone: '123456789789',
        email: 'saleh@saleh.com',
      }),
    ).rejects.toThrow(BadRequestException);
  });

  it('login with correct password and username', async () => {
    const result = await controller.login({
      username: 'salehs12asssasddasassd',
      password: 'asdasd',
    });
    expect(result.hasOwnProperty('token')).toEqual(true);
  });

  it('login with not exist username', async () => {
    jest
      .spyOn(controller, 'login')
      .mockRejectedValue(new NotFoundException('User not found'));
    await expect(
      controller.login({
        username: 'salehs12asssasddasassd',
        password: 'asdasd',
      }),
    ).rejects.toThrow(NotFoundException);
  });

  it('login with incorrect password', async () => {
    jest
      .spyOn(controller, 'login')
      .mockRejectedValue(new BadRequestException('Wrong password'));
    await expect(
      controller.login({
        username: 'salehs12asssasddasassd',
        password: 'as11111111da1sd',
      }),
    ).rejects.toThrow(BadRequestException);
  });
});
