import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaService } from '../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  const mockUser = {
    id: 1,
    email: 'test@example.com',
    name: 'Test User',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockUsersService = {
    create: jest.fn().mockResolvedValue(mockUser),
    findAll: jest.fn().mockResolvedValue([mockUser]),
    findOne: jest.fn().mockResolvedValue(mockUser),
    update: jest.fn().mockResolvedValue({ ...mockUser, name: 'Updated' }),
    remove: jest.fn().mockResolvedValue(mockUser),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a user', async () => {
      const dto: CreateUserDto = { email: 'test@example.com', name: 'Test User' };
      const result = await controller.create(dto);
      expect(result).toEqual(mockUser);
      expect(service.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const result = await controller.findAll();
      expect(result).toEqual([mockUser]);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single user', async () => {
      const result = await controller.findOne(1);
      expect(result).toEqual(mockUser);
      expect(service.findOne).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException for non-existent user', async () => {
      mockUsersService.findOne.mockRejectedValueOnce(
        new NotFoundException('User with ID 999 not found'),
      );
      await expect(controller.findOne(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const dto: UpdateUserDto = { name: 'Updated' };
      const result = await controller.update(1, dto);
      expect(result).toEqual({ ...mockUser, name: 'Updated' });
      expect(service.update).toHaveBeenCalledWith(1, dto);
    });
  });

  describe('remove', () => {
    it('should remove a user', async () => {
      const result = await controller.remove(1);
      expect(result).toEqual(mockUser);
      expect(service.remove).toHaveBeenCalledWith(1);
    });
  });
});
