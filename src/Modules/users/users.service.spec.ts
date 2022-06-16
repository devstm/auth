import { BadRequestException } from '@nestjs/common';
import { getModelToken } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import { Sequelize } from 'sequelize-typescript';
import { userProviders } from './user.provide';
import { UsersController } from './users.controller';
import { User } from './users.model';
import { UsersService } from './users.service';
const sequelize = new Sequelize({
  dialect: 'mysql',
  host: 'localhost',
  username: 'root',
  password: null,
  database: 'testauth',
});

sequelize.addModels([User]);
describe('SalehService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        ...userProviders,
        {
          provide: getModelToken(User),
          useValue: User,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('create new user', async () => {
    const user: any = await service.create({
      username: 'salehs12asddddddddssasddasassd',
      password: 'asddasd',
      phone: '12345dd6789789',
      email: 'sadddd@sa.com',
    });
    expect(user.username).toBe('salehs12asddddddddssasddasassd');
  });

  it('login with valid data', async () => {
    const result = await service.login({
      username: 'salehs12asddddddddssasddasassd',
      password: 'asddasd',
    });
    expect(result.hasOwnProperty('token')).toEqual(true);
  });

  it('login with incorrect password', async () => {
    jest
      .spyOn(service, 'login')
      .mockRejectedValue(new BadRequestException('Wrong password'));
    await expect(
      service.login({
        username: 'salehs12asssasddasassd',
        password: 'as11111111da1sd',
      }),
    ).rejects.toThrow(BadRequestException);
  });
});
