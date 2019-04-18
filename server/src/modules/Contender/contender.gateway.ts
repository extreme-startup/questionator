import { OnGatewayConnection, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Client, Server } from 'socket.io';
import { JoinResponseDto } from './dto/joinResponse.dto';
import { Answer } from './dto/answer.dto';
import { JoinRequestDto } from './dto/joinRequest.dto';
import { Observable, of, Subject, throwError } from 'rxjs';
import { filter, first, switchMap } from 'rxjs/internal/operators';
import { Contender } from './dto/Contender';

const JOIN_MESSAGE_NAME = 'join';
const QUESTION_MESSAGE_NAME = 'question';
const ANSWER_MESSAGE_NAME = 'answer';

@WebSocketGateway()
export class ContenderGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  private contenders: Contender[] = [];
  private answerSubj: Subject<Answer> = new Subject<Answer>();

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
    this.getAnswer(joinRequest.login, '123').subscribe();
  }

  @SubscribeMessage(ANSWER_MESSAGE_NAME)
  onAnswer(client: Client, answerFromUser: Answer): void {
    this.answerSubj.next(answerFromUser);
  }

  getAnswer(email: string, question: string): Observable<string> {
    const contender = this.getContenderByEmail(email);
    const hash = this.getHash(question);

    if (!contender) {
      return Observable.throw('No such contender');
    }
    contender.client.emit(QUESTION_MESSAGE_NAME, {question, hash});

    return this.answerSubj
      .pipe(
        filter(({login, hash: answerHash}: Answer) => login === email && answerHash === hash),
        first(),
        switchMap(({answer, success}: Answer) => success
          ? of(answer)
          : throwError('Could not get answer')
        )
      );
  }

  getContenderByEmail(email: string): Contender {
    return this.contenders
      .find(({email: cEmail}) => cEmail === email);
  }

  addContender(contender: Contender) {
    this.contenders.push(contender);
  }

  removeContenderByClient(client: Client): void {
    this.contenders = this.contenders
      .filter(({client: cClient}) => cClient !== client);
  }

  removeContenderByEmail(email: string): void {
    this.contenders = this.contenders
      .filter(({email: cEmail}) => cEmail !== email);
  }

  getHash(question: string) {
    let s = question + Math.random()+ new Date();
    return s
      .split("")
      .reduce((prevHash, currVal) =>
        (((prevHash << 5) - prevHash) + currVal.charCodeAt(0))|0, 0)
      .toString();
  }
}
