import { Logger } from '@nestjs/common';
import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';


const options  = {
  allowEIO3:true,
  cors:{
    origin:'*',
    methods: ["GET", "POST"]
  }
}

@WebSocketGateway({ allowEIO3:true })
export class AppGateway {

  users: number = 0;

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
    this.users = 0;
  }

  handleConnection(client:Socket, ...args:any[]){
    this.logger.debug(`Client connected: ${client.id}`);
    this.logger.debug(`key--------------->${client.handshake.headers.key}`)
    if(client.handshake.headers.key !== 'hm2021'){
      this.logger.debug('cliente no autorizado')
      client.disconnect();
    }else{
      this.logger.debug('CLIENTE AUTORIZADO')
    }
    client.emit('message', {name:'Team Hamilton-Murphy', text:"Te has conectado al servidor, crack!" });
    this.users++;
    this.server.emit('connected-clients',{q:this.users});
  }
  
  handleDisconnect(client:Socket){
    this.logger.debug(`Client disconnected: ${client.id}`);
    this.users--;
    this.server.emit('connected-clients',{q:this.users});
  }


}
