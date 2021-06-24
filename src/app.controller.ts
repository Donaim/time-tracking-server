import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

/**
 * Root module controller.
 * Handles some miscellanous stateless requests.
 * @namespace
 */
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   * GET /ping request.
   * Returns "pong" in text/plain.
   * Useful to probe server availability.
   */
  @Get('/ping')
  getPing(): string {
    return this.appService.getPing();
  }
}
