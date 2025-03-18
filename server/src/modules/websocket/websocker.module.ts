// src/chat/chat.module.ts
import { Module } from '@nestjs/common';
import { ChatGateway } from './websocket.getway';


@Module({
  providers: [ChatGateway],
})
export class ChatModule {}