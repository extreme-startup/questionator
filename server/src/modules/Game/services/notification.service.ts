import { Injectable } from '@nestjs/common';
import { interval, Observable, of, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Player } from '../entities/player';
import { Game } from '../entities/game';
// ToDo: Replace later on HttpModule from nestjs
// ToDo: Remove requestlib, currently only for demo purposes
import * as request from 'request';

// tslint:disable:no-console

@Injectable()
export class NotificationService {
  private playersSubscriptions: Subscription[] = [];

  private notify(player: Player): Observable<any> {
    return interval(5000).pipe(
      switchMap(() => {
        console.log('request!!!!');

        const queryString = `question=${encodeURI(
          `What is the first digit of the number? ${`${parseInt(
            `${Math.random() * 1000000}`,
            undefined,
          )}`}`,
        )}`;

        // ToDo: replace request lib call with nestjs HttpModule
        request.get(
          `${player.host}?${queryString}`,
          (error, response, body) => {
            // console.log('error:', error); // Print the error if one occurred
            console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
            console.log('body:', body); // Print the HTML for the Google homepage.
          },
        );

        return of({});
      }),
    );
  }

  public notifyPlayers(game: Game): void {
    if (Array.isArray(this.playersSubscriptions)) {
      this.playersSubscriptions.forEach(
        (sub: Subscription) => sub && sub.unsubscribe(),
      );
    }

    this.playersSubscriptions = game.players.map(
      (player: Player) =>
        this.notify(player) && this.notify(player).subscribe(),
    );
  }
}
