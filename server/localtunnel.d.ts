/// <reference types="node" />

declare function localtunnel(
  port: number,
  callback: localtunnel.TunnelCallback,
): localtunnel.Tunnel;

declare function localtunnel(
  port: number,
  opt: localtunnel.TunnelConfig,
  callback: localtunnel.TunnelCallback,
): localtunnel.Tunnel;

// tslint:disable-next-line:no-namespace
declare namespace localtunnel {
  export type TunnelCallback = (
    err: string,
    tunnel?: localtunnel.Tunnel,
  ) => void;

  export interface TunnelConfig {
    host?: string;
    subdomain?: string;
    port?: number;
    local_host?: string;
  }

  export interface Tunnel {
    url: string;
    tunnel_cluster: TunnelCluster;
    open(err: string, tunnel?: localtunnel.Tunnel): void;
    close(): void;
  }

  export interface TunnelCluster {
    domain: string;
  }

  const prototype: {};
}

export = localtunnel;
