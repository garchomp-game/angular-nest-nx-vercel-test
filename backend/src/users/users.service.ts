import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    this.logger.log(`Creating user with email: ${createUserDto.email}`);
    return this.prisma.user.create({
      data: createUserDto,
    });
  }

  async findAll() {
    this.logger.log('Finding all users');
    return this.prisma.user.findMany();
  }

  async findOne(id: number) {
    this.logger.log(`Finding user with id: ${id}`);
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    this.logger.log(`Updating user with id: ${id}`);
    await this.findOne(id); // Ensure user exists
    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async remove(id: number) {
    this.logger.log(`Removing user with id: ${id}`);
    await this.findOne(id); // Ensure user exists
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
