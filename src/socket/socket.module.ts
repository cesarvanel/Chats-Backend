import { Module } from '@nestjs/common';
import { MySocketGateWay } from './socket.gateway';
import { AuthModule } from 'src/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schema/user.schema';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ schema: UserSchema, name: User.name }]),
  ],
  providers: [MySocketGateWay],
})
export class SocketModule {}
