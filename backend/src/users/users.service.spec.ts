import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaService } from '../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';

describe('UsersService', () => {
  let service: UsersService;
  let prisma: PrismaService;

  const mockUser = {
    id: 1,
    email: 'test@example.com',
    name: 'Test User',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockPrismaService = {
    user: {
      create: jest.fn().mockResolvedValue(mockUser),
      findMany: jest.fn().mockResolvedValue([mockUser]),
      findUnique: jest.fn().mockResolvedValue(mockUser),
      update: jest.fn().mockResolvedValue({ ...mockUser, name: 'Updated' }),
      delete: jest.fn().mockResolvedValue(mockUser),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a user', async () => {
      const dto = { email: 'test@example.com', name: 'Test User' };
      const result = await service.create(dto);
      expect(result).toEqual(mockUser);
      expect(prisma.user.create).toHaveBeenCalledWith({ data: dto });
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const result = await service.findAll();
      expect(result).toEqual([mockUser]);
      expect(prisma.user.findMany).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single user', async () => {
      const result = await service.findOne(1);
      expect(result).toEqual(mockUser);
      expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { id: 1 } });
    });

    it('should throw NotFoundException when user not found', async () => {
      mockPrismaService.user.findUnique.mockResolvedValueOnce(null);
      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
    });

    it('should throw NotFoundException with correct message when user not found', async () => {
      mockPrismaService.user.findUnique.mockResolvedValueOnce(null);
      await expect(service.findOne(999)).rejects.toThrow(
        'User with ID 999 not found',
      );
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const dto = { name: 'Updated' };
      const result = await service.update(1, dto);
      expect(result).toEqual({ ...mockUser, name: 'Updated' });
      expect(prisma.user.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: dto,
      });
    });

    it('should throw NotFoundException when updating non-existent user', async () => {
      mockPrismaService.user.findUnique.mockResolvedValueOnce(null);
      await expect(service.update(999, { name: 'Test' })).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('remove', () => {
    it('should remove a user', async () => {
      const result = await service.remove(1);
      expect(result).toEqual(mockUser);
      expect(prisma.user.delete).toHaveBeenCalledWith({ where: { id: 1 } });
    });

    it('should throw NotFoundException when removing non-existent user', async () => {
      mockPrismaService.user.findUnique.mockResolvedValueOnce(null);
      await expect(service.remove(999)).rejects.toThrow(NotFoundException);
    });
  });
});
