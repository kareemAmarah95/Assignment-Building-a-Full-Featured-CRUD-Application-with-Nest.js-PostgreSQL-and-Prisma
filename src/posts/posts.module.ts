import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostsService } from './posts.service';

@Module({
  controllers: [PostController],
  providers: [PostsService],
})
export class PostsModule {}
