import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

type message = {
  avatar: string;
  message: string;
  createdAt: Date;
  isMyMessage: boolean;
};

export type ConversationsDocument = HydratedDocument<Conversations>;

@Schema()
export class Conversations {
  @Prop({ required: false })
  avatar: string;

  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  createdAt: Date;

  @Prop({ required: true })
  lastMessageText: string;

  @Prop({ required: false })
  messages: message[];
  
}

export const ConversationsSchema = SchemaFactory.createForClass(Conversations);
