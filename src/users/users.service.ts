import { Injectable } from '@nestjs/common';

import { User, UserRole } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}
  private users: User[] = [
    {
      id: 1,
      full_name: 'John Doe',
      username: 'johndoe',
      email: 'john.doe@example.com',
      hashedPassword: 'hashedpassword1',
      password: 'password1',
      dob: new Date('1990-01-01'),
      role: UserRole.USER,
      created_at: new Date(),
      updated_at: new Date(),
    },
  ];
  async findAll() {
    return this.prisma.user.findMany();
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }

  async findAnotherOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }

  async create(data: any) {
    return this.prisma.user.create({
      data,
    });
  }

  async update(id: number, data: any) {
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
