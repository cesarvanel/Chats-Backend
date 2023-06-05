import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
} from '@nestjs/websockets';
import { OnModuleInit } from '@nestjs/common';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class MySocketGateWay implements OnModuleInit {
  @WebSocketServer()
  server: Server;
  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log(socket.id);
      console.log('connected');
    });
    
  }

  @SubscribeMessage('events')
  handleEvent(@MessageBody() data: any): any {
    console.log(data)
    this.server.emit('events', {
      msg: 'events',
      content: data,
    });
  }

}
