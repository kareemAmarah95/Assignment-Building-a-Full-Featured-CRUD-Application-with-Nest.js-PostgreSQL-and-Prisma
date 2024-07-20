import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
@Controller('post')
export class PostController {
  constructor(private readonly prismaService: PrismaService) {}

  @Post()
  async createPost(
    @Body()
    data: {
      title: string;
      description: string;
      published: boolean;
      userId: number;
      content: string;
      created_at: string;
      updated_at: string;
    },
  ) {
    return this.prismaService.post.create({
      data: {
        title: data.title,
        description: data.description,
        published: data.published,
        created_at: data.created_at,
        updated_at: data.updated_at,
        user: {
          connect: {
            id: data.userId,
          },
        },
        content: data.content,
      },
    });
  }

  @Get()
  async getPosts() {
    return this.prismaService.post.findMany();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.prismaService.post.findUnique({
      where: {
        id: Number(id),
      },
    });
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: any) {
    return this.prismaService.post.update({
      where: { id: Number(id) },
      data: body,
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.prismaService.post.delete({
      where: { id: Number(id) },
    });
  }
}
