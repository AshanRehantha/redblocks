import { Injectable } from '@nestjs/common';
import * as Pusher from 'pusher';

@Injectable()
export class PusherService {
  private pusher: Pusher;

  constructor() {
    this.pusher = new Pusher({
      appId: "1959639",
      key: "e5186d916d8ab2f20692",
      secret: "6bab75cfe4d9303a19a4",
      cluster: "ap2",
      useTLS: true,
    });
  }

  async trigger(channel: string, event: string, data: any) {
    await this.pusher.trigger(channel, event, data);
  }

  // Add this method for private channel authentication
  authenticate(socketId: string, channel: string) {
    return this.pusher.authenticate(socketId, channel);
  }
}