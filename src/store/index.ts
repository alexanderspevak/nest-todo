import { Tedis } from 'tedis';

const EXPIRATION = 60 * 60 * 60 * 3;

class Store {
  client: Tedis;

  constructor() {
    this.client = new Tedis({
      port: 6379,
      host: '127.0.0.1',
    });
  }

  public get(key: string): Promise<any> {
    return this.client.get(key);
  }

  public set(key: string, value: any, expiration = EXPIRATION): Promise<'OK'> {
    return this.client.command('set', key, value, 'EX', expiration);
  }
}

export const store = new Store();
