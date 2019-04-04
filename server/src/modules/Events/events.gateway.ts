import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
  OnGatewayConnection,
} from '@nestjs/websockets';
import { from, Observable, timer } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@WebSocketGateway()
export class EventsGateway implements OnGatewayConnection {
  @WebSocketServer()
  server;

  async handleConnection(client) {
    console.log('handleConnection');
    client.emit('events', 'can you hear me?', 1, 2, 'abc');
    this.server.emit('customEmit', 'TEST messages');
  }

  async handleDisconnect(socket) {
    console.log('handleDisconnect');
    this.server.emit('customEmit', 'TEST messages');
  }

  @SubscribeMessage('events')
  findAll(client, data): Observable<WsResponse<number>> {
    console.log(data);

    client.emit('events', ' client TEST messages');
    this.server.emit('events', 'server TEST messages');

    client.broadcast.emit('events', 'hello friends!');

    // timer(0, 2000)
    //   .pipe(tap(() => this.server.emit('events', Math.random() * 1000)))
    //   .subscribe();

    return from([1, 2, 3]).pipe(map(item => ({ event: 'events', data: item })));
  }
}
