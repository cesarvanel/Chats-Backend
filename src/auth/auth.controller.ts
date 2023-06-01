import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  Get,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupUserDto } from './dto/signUp-auth.dto';
import { SigninUserDto } from './dto/signIn-auth.dto';
import { Tokens } from './interfaces/token.interface';
import { User } from './schema/user.schema';
import { AtGuard, RtGuard } from './common/guards';
import { GetCurrentUser } from './common/decorators/get-current-user.decorator';
import { Public } from './common/decorators';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.authService.findAll();
  }

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async signUp(
    @Body(ValidationPipe) signupUserDto: SignupUserDto,
  ): Promise<Tokens> {
    return this.authService.signUp(signupUserDto);
  }

  @Public()
  @Post('signin')
  @HttpCode(HttpStatus.OK)
  async signIn(
    @Body(ValidationPipe) signinUserDto: SigninUserDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(signinUserDto);
  }

  @Public()
  @UseGuards(RtGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refreshToken(@GetCurrentUser() user: User) {
    return this.authService.refreshToken(
      user['username'],
      user['refreshToken'],
    );
  }

  @UseGuards(AtGuard)
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(@GetCurrentUser() user: User) {
    return this.authService.logout(user['username']);
  }
}
