import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Conversations, ConversationsDocument } from 'src/schema/conversation.schema';


@Injectable()
export class ConservationsService {
  constructor(
    @InjectModel(Conversations.name)
    private ConservationsModel: Model<Conversations>,
    private jwtService: JwtService,
  ) {}

  async findAll(): Promise<ConversationsDocument[]> {
    return this.ConservationsModel.find()
  }
}
