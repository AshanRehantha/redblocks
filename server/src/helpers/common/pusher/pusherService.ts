// src/helpers/common/pusher/pusherService.ts
import { Injectable } from '@nestjs/common';
import * as Pusher from 'pusher';

@Injectable()
export class PusherService {
  private pusher: any;

  constructor() {
    this.pusher = new Pusher({
      appId: '1959639',
      key: 'e5186d916d8ab2f20692',
      secret: '6bab75cfe4d9303a19a4',
      cluster: 'ap2',
      useTLS: true,
    });
  }

  async trigger(channel: string, event: string, data: any) {
    return this.pusher.trigger(channel, event, data);
  }

  authorizeChannel(socketId: string, channel: string) {
    return this.pusher.authorizeChannel(socketId, channel);
  }
}