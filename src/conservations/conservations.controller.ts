import { Controller, Get, UseGuards } from '@nestjs/common';
import { AtGuard } from 'src/auth/common/guards';
import { ConversationsDocument } from 'src/schema/conversation.schema';
import { ConservationsService } from './conservations.service';

@UseGuards(AtGuard)
@Controller('conversations')
export class ConservationsController {
  constructor(private conservationsService: ConservationsService) {}

  @Get()
  async findAll(): Promise<ConversationsDocument[]> {
    return await this.conservationsService.findAll();
  }
}
