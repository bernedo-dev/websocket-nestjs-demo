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

  @SubscribeMessage('chat')
  handleMessage(client: Socket, payload: string): void {
    this.logger.debug(`mensaje: ${payload}`);
    this.server.emit('chat', payload);
  }



  afterInit(server: Server){
    this.logger.debug('Iniciado socket');
    this.users = 0;
  }

  handleConnection(client:Socket, ...args:any[]){
    this.logger.debug(`Client connected: ${client.id}`);
    if(client.handshake.headers.key !== 'hm2021'){
      this.logger.debug('cliente no autorizado')
      client.disconnect();
      return;
    }else{
      this.logger.debug('CLIENTE AUTORIZADO')
    }
    client.emit('chat', {name:'Team Hamilton-Murphy', text:"¡Hola! ¿En qué te puedo ayudar?" });
    setTimeout(() => {
      // client.emit('chat', {name:'1', text:'Solicitar Productos'});
      // client.emit('chat', {name:'2', text:'Consultas relacionadas a Falabella, Sodimac, Tottus, Linio.'});
      // client.emit('chat', {name:'3', text:'Ubicación oficinas y sus horarios'});
      // client.emit('chat', {name:'4', text:'Solicitar Estado de Cuenta o Cartola'});
      // client.emit('chat', {name:'5', text:'Crear o recuperar claves'});
      // client.emit('chat', {name:'6', text:'Bloquear/Desbloquear'});
      // client.emit('chat', {name:'7', text:'Conocer Facturado pendiente y/o Pago mínimo'});
      // client.emit('chat', {name:'8', text:'Otro'});
      client.emit('option-buttons',[
        {key:'1', value:'Solicitar Productos'},
        {key:'2', value:'Consultas relacionadas a Falabella, Sodimac, Tottus, Linio.'},
        {key:'3', value:'Ubicación oficinas y sus horarios'},
        {key:'4', value:'Solicitar Estado de Cuenta o Cartola'},
        {key:'5', value:'Crear o recuperar claves'},
        {key:'6', value:'Bloquear/Desbloquear'},
      ]);
    }, 3000);
    this.users++;
    this.server.emit('connected-clients',{q:this.users});
  }
  
  handleDisconnect(client:Socket){
    this.logger.debug(`Client disconnected: ${client.id}`);
    this.users--;
    this.server.emit('connected-clients',{q:this.users});
  }


}
