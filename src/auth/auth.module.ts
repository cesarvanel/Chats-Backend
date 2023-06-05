import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { AtStrastegy, RtStrastegy } from './strastegies';

@Module({
  imports: [
    MongooseModule.forFeature([{ schema: UserSchema, name: User.name }]),
    JwtModule.register({
      global: true,
      secret: 'believe_in_me',
      signOptions: { expiresIn: "10h" },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService,AtStrastegy, RtStrastegy],
})
export class AuthModule {}
