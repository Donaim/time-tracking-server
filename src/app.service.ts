import { Injectable } from '@nestjs/common';

/**
 * Root module service.
 * Used by {@link AppController}.
 * @namespace
 */
@Injectable()
export class AppService {
  /**
   * Handler for ping request.
   */
  getPing(): string {
    return 'pong';
  }
}
