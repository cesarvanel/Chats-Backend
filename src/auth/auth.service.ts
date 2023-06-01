import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schema/user.schema';
import { SignupUserDto } from './dto/signUp-auth.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import {
  ConflictException,
  InternalServerErrorException,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common/exceptions';
import { SigninUserDto } from './dto/signIn-auth.dto';
import { Tokens } from './interfaces/token.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async hashData(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  async checkValidPassword(
    password: string,
    hahedPassword: string,
  ): Promise<boolean> {
    const isValid = await bcrypt.compare(password, hahedPassword);
    return isValid;
  }

  async getToken(email: string, number: string) {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        { email, number },
        { secret: 'believe_in_me', expiresIn: 120 },
      ),
      this.jwtService.signAsync(
        { email, number },
        { secret: 'relieve_in_me', expiresIn: 60 * 60 * 24 * 7 },
      ),
    ]);

    return {
      accessToken: at,
      refreshToken: rt,
    };
  }

  async updateRtHash(email: string, rt: string) {
    const hash = await this.hashData(rt);
    await this.userModel.findOneAndUpdate({ email }, { hahedRt: hash });
  }

  async signUp(signupUserDto: SignupUserDto): Promise<Tokens> {
    const { username, password, number, email,job,avatar } = signupUserDto;
    const user = await this.userModel.findOne({ email });
    if (user) {
      throw new ConflictException('user already exist');
    }

    const salt = await bcrypt.genSalt(10);
    const hahedPassword = await bcrypt.hash(password, salt);
    const createUser = new User();
    createUser.username = username;
    createUser.password = hahedPassword;
    createUser.number = number;
    createUser.email = email, 
    createUser.job = job; 
    createUser.image.push(avatar)


    try {
      (await this.userModel.create(createUser)).save();
      const tokens = await this.getToken(
        createUser.username,
        createUser.number,
      );
      await this.updateRtHash(username, tokens.refreshToken);
      return tokens;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async signIn(signinUserDto: SigninUserDto): Promise<Tokens> {
    const { email, password } = signinUserDto;
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new UnauthorizedException('wrong credential try aigaint');
    }

    const isValidPassword = await this.checkValidPassword(
      password,
      user.password,
    );

    if (!isValidPassword) {
      throw new UnauthorizedException('wrong credential try aigaint');
    }

    const tokens = await this.getToken(user.email, user.number);
    await this.updateRtHash(user.email, tokens.refreshToken);
    return tokens;
  }

  async refreshToken(email: string, rt: string) {
    const user = await this.userModel.findOne({ email });
    if (!user || !user.hahedRt)
      throw new UnauthorizedException('Access denied');

    const rtMatch = await bcrypt.compare(rt, user.hahedRt);

    if (!rtMatch) throw new ForbiddenException('Access denied');

    const tokens = await this.getToken(user.email, user.number);
    await this.updateRtHash(user.email, tokens.refreshToken);
    return tokens;
  }
  async logout(email: string) {
    await this.userModel.findOneAndUpdate(
      { email },
      {
        hahedRt: null,
      },
    );
  }

  async findAll(): Promise<UserDocument[]> {
    return this.userModel.find().exec();
  }
}
