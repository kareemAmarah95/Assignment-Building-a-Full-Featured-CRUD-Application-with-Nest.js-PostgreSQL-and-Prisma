import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { JwtService } from '@nestjs/jwt';
@Controller('user')
export class UserController {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  @Post()
  async createUser(
    @Body()
    data: {
      full_name: string;
      email: string;
      dob: string;
      password: string;
      created_at: string;
      updated_at: string;
    },
  ) {
    return this.prismaService.user.create({
      data: {
        full_name: data.full_name,
        email: data.email,
        password: data.password,
        dob: new Date(data.dob),
        created_at: data.created_at,
        updated_at: data.updated_at,
      },
    });
  }

  @Get()
  async getUsers() {
    return this.prismaService.user.findMany();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.prismaService.user.findUnique({
      where: {
        id: Number(id),
      },
    });
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: any) {
    return this.prismaService.user.update({
      where: { id: Number(id) },
      data: body,
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.prismaService.user.delete({
      where: { id: Number(id) },
    });
  }

  @Post('register')
  async register(
    @Body()
    data: {
      full_name: string;
      email: string;
      password: string;
      dob: string;
    },
  ) {
    const existingUser = await this.prismaService.user.findUnique({
      where: { email: data.email },
    });
    if (existingUser) {
      throw new BadRequestException('Email is already in use');
    }
    const hashedPassword = await bcrypt.hash(data.password, 10);
    return this.prismaService.user.create({
      data: {
        full_name: data.full_name,
        email: data.email,
        password: hashedPassword,
        dob: new Date(data.dob),
      },
    });
  }

  @Post('login')
  async login(@Body() data: { email: string; password: string }) {
    const user = await this.prismaService.user.findUnique({
      where: { email: data.email },
    });
    if (!user) {
      throw new BadRequestException('Invalid Credentials');
    }

    const passwordMatch = await bcrypt.compare(data.password, user.password);
    if (!passwordMatch) {
      throw new BadRequestException('Invalid credentials');
    }
    const token = jwt.sign({ userId: user.id }, 'secret-key', {
      expiresIn: '1h',
    });
    return { token };
  }
}
