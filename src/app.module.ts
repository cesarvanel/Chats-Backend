import { Module } from '@nestjs/common';
import { SocketModule } from './socket/socket.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_GUARD } from '@nestjs/core';
import { AtGuard } from './auth/common/guards';

@Module({
  imports: [
    SocketModule,
    AuthModule,
    MongooseModule.forRoot('mongodb://localhost/chats'),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
  ],
})
export class AppModule {}
