import { Injectable } from '@nestjs/common';
import * as localTunnel from 'localtunnel';
import { ConfigService } from '../../../config';

// tslint:disable:no-console

@Injectable()
export class LocalTunnelService {
  private localTunnel: localTunnel.Tunnel = null;
  private host: string = '';

  private readonly options: localTunnel.TunnelConfig = {
    subdomain: 'questinator',
    port: Number(this.configService.port()),
  };

  constructor(private readonly configService: ConfigService) {}

  public get url(): string {
    return this.host;
  }

  public start(): Promise<string> {
    return new Promise((resolve, reject) => {
      if (!this.host) {
        localTunnel(
          this.options.port,
          this.options,
          (err: string, tunnel: localTunnel.Tunnel) => {
            if (err) {
              throw new Error(err);
            }

            this.localTunnel = tunnel;
            this.host = tunnel.url;

            console.log(`local tunnel started on ${this.host}`);
            return resolve(`local tunnel started on ${this.host}`);
          },
        );
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
