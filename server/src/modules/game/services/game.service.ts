import { HttpService, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs/index';
import { map } from 'rxjs/operators';

// tslint:disable:no-console

@Injectable()
export class GameService {
  constructor(private readonly httpService: HttpService) {

  }

  public async register(id: string) {
    console.log('Registered game with Id: ', id);
  }

  public start(id: string) {
    console.log('Game started with id: ', id);
  }

  public stop(id: string) {
    console.log('Stop game with id: ', id);
  }

  public getAnswer(question: string, url: string): Observable<string> {
    return this.httpService
      .get<string>(url, {
        params: {
          question
        }
      })
      .pipe(map(({data}) => data));
  }
}
