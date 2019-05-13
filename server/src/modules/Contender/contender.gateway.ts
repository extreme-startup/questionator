import {
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Client, Server } from 'socket.io';
import { JoinResponseDto } from './dto/joinResponse.dto';
import { Answer } from './dto/answer.dto';
import { JoinRequestDto } from './dto/joinRequest.dto';
import { Observable, of, Subject, throwError } from 'rxjs';
import { filter, first, switchMap } from 'rxjs/operators';
import { Contender } from './dto/Contender';
import * as uuid from 'uuid';

import {
  JOIN_MESSAGE_NAME,
  QUESTION_MESSAGE_NAME,
  ANSWER_MESSAGE_NAME,
  NO_CONTENDER_MESSAGE,
  NO_ANSWER_MESSAGE,
} from './constants';

@WebSocketGateway()
export class ContenderGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  private contenders: Contender[] = [];
  private answerSubj: Subject<Answer> = new Subject<Answer>();

  constructor() {
    this.getAnswer.bind(this);
  }

  handleConnection(client: Client): void {
    console.log('Client connected'); //tslint:disable-line
  }

  handleDisconnect(client: Client): void {
    this.removeContenderByClient(client);
  }

  @SubscribeMessage(JOIN_MESSAGE_NAME)
  onJoin(client: Client, joinRequest: JoinRequestDto): void {
    const response: JoinResponseDto = new JoinResponseDto(true, '');

    this.addContender(new Contender(joinRequest.login, client));
    client.emit(JOIN_MESSAGE_NAME, response);
  }

  @SubscribeMessage(ANSWER_MESSAGE_NAME)
  onAnswer(client: Client, answerFromUser: Answer): void {
    this.answerSubj.next(answerFromUser);
  }

  getAnswer(email: string, question: string): Observable<string> {
    const contender = this.getContenderByEmail(email);
    const hash = this.getHash(question);

    if (!contender) {
      return throwError(NO_CONTENDER_MESSAGE);
    }
    contender.client.emit(QUESTION_MESSAGE_NAME, { question, hash });

    return this.answerSubj.pipe(
      filter(
        ({ login, hash: answerHash }: Answer) =>
          login === email && answerHash === hash,
      ),
      first(),
      switchMap(({ answer, success }: Answer) =>
        success ? of(answer) : throwError(NO_ANSWER_MESSAGE),
      ),
    );
  }

  getContenderByEmail(email: string): Contender {
    return this.contenders.find(({ email: cEmail }) => cEmail === email);
  }

  addContender(contender: Contender) {
    this.contenders.push(contender);
  }

  removeContenderByClient(client: Client): void {
    this.contenders = this.contenders.filter(
      ({ client: cClient }) => cClient !== client,
    );
  }

  removeContenderByEmail(email: string): void {
    this.contenders = this.contenders.filter(
      ({ email: cEmail }) => cEmail !== email,
    );
  }

  getHash(question: string): string {
    return question + uuid();
  }
}
