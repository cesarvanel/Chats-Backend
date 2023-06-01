import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true })
  username: string;


  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, unique:true })
  number: string;

  @Prop({ required: false })
  avatar: string;

  @Prop({ required: false })
  city: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: false })
  about: string;

  @Prop({ required: false })
  job: string;

  @Prop({ type: [], required: false })
  image: any[];

  @Prop({ required: false })
  hahedRt: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
