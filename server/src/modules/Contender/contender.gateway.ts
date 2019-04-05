import { OnGatewayConnection, SubscribeMessage, WebSocketGateway, WebSocketServer, } from '@nestjs/websockets';
import { Client, Server } from 'socket.io';
import { JoinResponseDto } from './dto/joinResponse.dto';
import { Answer } from './dto/answer.dto';
import { JoinRequestDto } from './dto/joinRequest.dto';

const
  JOIN_MESSAGE_NAME = 'join',
  QUESTION_MESSAGE_NAME = 'question',
  ANSWER_MESSAGE_NAME = 'answer';

@WebSocketGateway()
export class ContenderGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  handleConnection(client: Client): void {
    console.log('Client connected');
  }

  handleDisconnect(): void {
    console.log('Client disconnected');
  }

  @SubscribeMessage(JOIN_MESSAGE_NAME)
  onJoin(client: Client, joinRequest: JoinRequestDto): void {
    console.log('Client joined: ', joinRequest.login);

    const response: JoinResponseDto = new JoinResponseDto(true, '');
    client.emit(JOIN_MESSAGE_NAME, response);

    // next mock should bee removed
    setInterval(() => this.sendQuestion(client, 'first question'), 5000);
  }

  @SubscribeMessage(ANSWER_MESSAGE_NAME)
  onAnswer(client: Client, answerFromUser: Answer): void {
    console.log('Answer from user: ', answerFromUser.answer);
  }

  sendQuestion(client: Client, question: string): void {
    client.emit(QUESTION_MESSAGE_NAME, question);
  }
}
