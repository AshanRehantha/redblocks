// src/chat/chat.gateway.ts
import { 
    WebSocketGateway, 
    WebSocketServer, 
    SubscribeMessage, 
    ConnectedSocket, 
    MessageBody 
  } from '@nestjs/websockets';
  import { Server, Socket } from 'socket.io';
  
  @WebSocketGateway({
    cors: {
      origin: '*', // In production, specify your React app's URL
    },
  })
  export class ChatGateway {
    @WebSocketServer()
    server: Server;
    
    private users = new Map(); // To store user socket mappings
  
    handleConnection(client: Socket) {
      console.log(`Client connected: ${client.id}`);
    }
  
    handleDisconnect(client: Socket) {
      // Remove user from mapping when they disconnect
      for (const [userId, socketId] of this.users.entries()) {
        if (socketId === client.id) {
          this.users.delete(userId);
          break;
        }
      }
      console.log(`Client disconnected: ${client.id}`);
    }
  
    @SubscribeMessage('register')
    handleRegister(@ConnectedSocket() client: Socket, @MessageBody() userId: string) {
      // Store the user's socket for private messaging
      this.users.set(userId, client.id);
      return { status: 'registered' };
    }
  
    @SubscribeMessage('privateMessage')
    handlePrivateMessage(
      @ConnectedSocket() client: Socket,
      @MessageBody() data: { to: string; content: string }
    ) {
      const recipientSocketId = this.users.get(data.to);
      
      if (recipientSocketId) {
        // Send to recipient
        this.server.to(recipientSocketId).emit('privateMessage', {
          from: this.getUserIdBySocketId(client.id),
          content: data.content,
        });
        
        // Send confirmation to sender
        return { status: 'sent' };
      }
      
      return { status: 'user-offline' };
    }
  
    private getUserIdBySocketId(socketId: string): string {
      for (const [userId, id] of this.users.entries()) {
        if (id === socketId) {
          return userId;
        }
      }
      return null;
    }
  }