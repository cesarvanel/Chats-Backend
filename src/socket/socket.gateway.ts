import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  WsException,
} from '@nestjs/websockets';
import { OnModuleInit } from '@nestjs/common';
import { Server } from 'socket.io';
import { EVENTS } from './socket.interface';
import { Injectable } from '@nestjs/common/decorators';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schema/user.schema';
import { Model } from 'mongoose';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
@Injectable()
export class MySocketGateWay implements OnModuleInit {
  constructor(
    private jwtService: JwtService,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  @WebSocketServer()
  server: Server;
  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log(socket.id);
    });
  }

  @SubscribeMessage(EVENTS.AUTHENTICATE_ME)
  async authenticate(@MessageBody() token: any) {
    try {
      const payload = this.jwtService.verify(token, {
        secret: 'believe_in_me',
      });
      const { email } = payload;

      const user = await this.userModel
        .findOne({ email })
        .select('-__v  -hahedRt ')
        .exec();

      this.server.emit(EVENTS.GET_PROFILE_DATA, user);
    } catch (error) {
      this.server.emit('error');

      throw new WsException('token expired');
    }
  }

  @SubscribeMessage('events')
  handleEvent(@MessageBody() data: any): any {
    console.log(data);
    this.server.emit('events', {
      msg: 'events',
      content: data,
    });
  }
}
