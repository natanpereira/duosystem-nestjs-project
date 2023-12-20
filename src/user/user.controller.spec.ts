import { HttpStatus, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Response } from 'express';
import { AppModule } from '../app.module';
import { UserEntity } from '../database/entities/user.entity';
import RepoService from '../repo.service';
import { UserInput } from './graphql/user.input';
import { UserController } from './user.controller';

describe('UserController', () => {
  let controller: UserController;
  let repoService: RepoService;

  beforeEach(async () => {
    jest.setTimeout(40000);
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    controller = moduleFixture.get<UserController>(UserController);
    repoService = moduleFixture.get<RepoService>(RepoService);
  });

  const mockUserModel: UserEntity = {
    username: 'username',
    password: 'password',
  };

  const mockUserInput: UserInput = {
    username: 'username',
    password: 'password',
  };

  const mockUserId = 1;

  const mockResponse = {
    status: jest.fn((status: HttpStatus) => ({
      json: (result: UserEntity) => result,
    })),
  } as unknown as Response;

  it('should return an array of users', async () => {
    const mockUsers: UserEntity[] = [];

    jest.spyOn(repoService.userRepository, 'find').mockResolvedValue(mockUsers);

    const result = await controller.getusers(mockResponse);

    expect(result).toEqual(mockUsers);
    expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.ACCEPTED);
  });

  it('should create a new user', async () => {
    jest
      .spyOn(repoService.userRepository, 'create')
      .mockReturnValue(mockUserModel);
    jest
      .spyOn(repoService.userRepository, 'save')
      .mockResolvedValue(mockUserModel);

    const result = await controller.createUser(mockUserInput, mockResponse);

    expect(result).toEqual(mockUserModel);
    expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.CREATED);
  });

  it('should update a user and return HTTP status 202', async () => {
    jest
      .spyOn(repoService.userRepository, 'findOneBy')
      .mockResolvedValue(mockUserModel);
    jest
      .spyOn(repoService.userRepository, 'update')
      .mockResolvedValue({} as any);
    jest
      .spyOn(repoService.userRepository, 'findOneBy')
      .mockResolvedValue(mockUserModel);

    await controller.updateUser(mockUserInput, mockUserId, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.ACCEPTED);
  });

  it('should throw NotFoundException for non-existing user during update', async () => {
    jest.spyOn(repoService.userRepository, 'findOneBy').mockResolvedValue(null);

    await expect(
      controller.updateUser(mockUserInput, mockUserId, mockResponse),
    ).rejects.toThrow(NotFoundException);
  });
});
