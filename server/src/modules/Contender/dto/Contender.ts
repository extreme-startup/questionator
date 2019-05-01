import { Client } from 'socket.io';

export class Contender {
  constructor(public email: string, public client: Client) {}
}
