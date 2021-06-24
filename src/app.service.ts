import { Injectable } from '@nestjs/common';

/**
 * Root module service.
 * Used by {@link AppController}.
 */
@Injectable()
export class AppService {
  getPing(): string {
    return 'pong';
  }
}
