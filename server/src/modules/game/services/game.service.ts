import { Injectable } from '@nestjs/common';

// tslint:disable:no-console

@Injectable()
export class GameService {
    public async register(id: string) {
        console.log('Registered game with Id: ', id);
    }

    public start(id: string) {
        console.log('Game started with id: ', id);
    }

    public stop(id: string) {
        console.log('Stop game with id: ', id);
    }
}
