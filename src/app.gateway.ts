import { Logger } from '@nestjs/common';
import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';


@WebSocketGateway({allowEIO3:true})
export class AppGateway {

  @WebSocketServer() 
  server: Server;

  private readonly logger:Logger = new Logger(AppGateway.name);

  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: string): void {
    this.logger.debug(`mensaje: ${payload}`);
    this.server.emit('message', payload);
  }



  afterInit(server: Server){
    this.logger.debug('Iniciado socket');
  }

  handleConnection(client:Socket, ...args:any[]){
    this.logger.debug(`Client connected: ${client.id}`);
    client.emit('message', {name:'Team Hamilton-Murphy', text:"Te has conectado al servidor, crack!" })
  }

  handleDisconnect(client:Socket){
    this.logger.debug(`Client disconnected: ${client.id}`);
  }


}
