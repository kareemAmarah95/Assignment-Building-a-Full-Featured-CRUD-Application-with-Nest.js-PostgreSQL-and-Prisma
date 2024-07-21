import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Module({
  imports: [
    JwtModule.register({
      secret: 'yourSecretKey', // Use a strong secret key
      signOptions: { expiresIn: '60m' }, // Token expiration time
    }),
  ],
  providers: [AuthService, UsersService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
