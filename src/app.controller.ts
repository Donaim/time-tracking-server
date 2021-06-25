import { Controller, Get } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { AppService } from './app.service';

/**
 * Root module controller.
 * Handles some miscellanous stateless requests.
 */
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/ping')
  @ApiOperation({
    summary:
      'Returns "pong" in text/plain. Useful to probe server availability.',
  })
  getPing(): string {
    return this.appService.getPing();
  }
}
