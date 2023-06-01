import { Module } from '@nestjs/common';
import { MySocketGateWay } from './socket.gateway';

@Module({
    providers:[MySocketGateWay]
})
export class SocketModule {}
