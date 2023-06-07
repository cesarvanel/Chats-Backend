import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConversationsSchema, Conversations } from 'src/schema/conversation.schema';
import { ConservationsService } from './conservations.service';
import { ConservationsController } from './conservations.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { schema: ConversationsSchema, name: Conversations.name },
    ]),
    AuthModule,
  ],
  providers: [ConservationsService],
  controllers: [ConservationsController],
})
export class ConservationsModule {}
