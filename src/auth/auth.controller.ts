import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Login successful!',
    type: () => ({ username: String, password: String }),
  })
  @ApiBody({
    schema: {
      example: {
        username: 'username',
        password: 'password',
      },
    },
  })
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }

  @Get('profile')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  getProfile(@Request() req) {
    return req.user;
  }
}
