import { Injectable } from '@nestjs/common';
import * as localTunnel from 'localtunnel';
import { ConfigService } from '../../../config';

// tslint:disable:no-console

@Injectable()
export class LocalTunnelService {
  private localTunnel: any = null;
  private host: string = '';

  private readonly options = {
    subdomain: 'questinator',
    port: this.configService.port(),
  };

  constructor(private readonly configService: ConfigService) {}

  public get url(): string {
    return this.host;
  }

  public start(): Promise<string> {
    return new Promise((resolve, reject) => {
      if (!this.host) {
        console.log('LOCAL TUNNEL: ', localTunnel, '\n\n');
        localTunnel(this.options.port, this.options, (err: any, tunnel: any) => {
          if (err) {
            throw new Error(err);
          }

          this.localTunnel = tunnel;
          this.host = tunnel.url;
          console.log(tunnel);
          console.log(`local tunnel started on ${this.host}`);
          return resolve(`local tunnel started on ${this.host}`);
        });
      } else {
        return reject(`local tunnel already started on ${this.host}`);
      }
    });
  }

  public close(): void {
    this.host = '';

    if (!!this.localTunnel) {
      this.localTunnel.close();
    }
  }
}
