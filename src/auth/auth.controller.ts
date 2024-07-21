import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  Response,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { Response as ExpressResponse } from 'express';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('signup')
  signup(@Body() dto: AuthDto) {
    return this.authService.signup(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login') // Typically, login should be a POST request
  async signIn(
    @Body() signInDto: { email: string; password: string },
    @Response() res: ExpressResponse,
  ) {
    const { email, password } = signInDto;

    try {
      // Call signIn method and await the result
      const result = await this.authService.signIn(email, password);

      // Send the response using the ExpressResponse object
      return res.status(HttpStatus.OK).json({
        message: 'User authenticated successfully',
        ...result, // Include additional data from the signIn method if needed
      });
    } catch (error) {
      // Handle error and send an appropriate response
      return res.status(HttpStatus.UNAUTHORIZED).json({
        message: 'Authentication failed',
      });
    }
  }

  @Get('signout')
  signout(@Req() req, @Res() res) {
    return this.authService.signout(req, res);
  }
}
