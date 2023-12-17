import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  async getUser(): Promise<string> {
    return 'Hello World';
  }
}
